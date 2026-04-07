"use client"

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { debounce } from "lodash"
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Runner,
  World,
} from "matter-js"

import { cn } from "@/lib/utils"

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100
    return containerSize * percentage
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2
}

type GravityProps = {
  children: ReactNode
  debug?: boolean
  gravity?: { x: number; y: number }
  resetOnResize?: boolean
  grabCursor?: boolean
  addTopWall?: boolean
  autoStart?: boolean
  className?: string
}

type PhysicsBody = {
  element: HTMLElement
  body: Matter.Body
  props: MatterBodyProps
}

type MatterBodyProps = {
  children: ReactNode
  matterBodyOptions?: Matter.IBodyDefinition
  isDraggable?: boolean
  x?: number | string
  y?: number | string
  angle?: number
  className?: string
}

export type GravityRef = {
  start: () => void
  stop: () => void
  reset: () => void
}

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void
  unregisterElement: (id: string) => void
} | null>(null)

const MatterBody = ({
  children,
  className,
  matterBodyOptions = { friction: 0.3, restitution: 0.4, density: 0.002 },
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    const id = idRef.current
    context.registerElement(id, elementRef.current, {
      children,
      matterBodyOptions,
      isDraggable,
      x,
      y,
      angle,
      ...props,
    })
    return () => context.unregisterElement(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={elementRef} className={cn("absolute", className, isDraggable && "pointer-events-none")}>
      {children}
    </div>
  )
}

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = false,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const engine = useRef(Engine.create())
    const runner = useRef<Runner>()
    const bodiesMap = useRef(new Map<string, PhysicsBody>())
    const frameId = useRef<number>()
    const mouseConstraint = useRef<Matter.MouseConstraint>()
    const mouseDown = useRef(false)
    const [, setCanvasSize] = useState({ width: 0, height: 0 })
    const isRunning = useRef(false)

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!containerRef.current) return
        const width = element.offsetWidth
        const height = element.offsetHeight
        const containerRect = containerRef.current.getBoundingClientRect()
        const angle = (props.angle || 0) * (Math.PI / 180)
        const x = calculatePosition(props.x, containerRect.width, width)
        const y = calculatePosition(props.y, containerRect.height, height)

        const body = Bodies.rectangle(x, y, width, height, {
          ...props.matterBodyOptions,
          angle,
          chamfer: { radius: 20 },
          render: { fillStyle: debug ? "#88888844" : "#00000000" },
        })

        World.add(engine.current.world, [body])
        bodiesMap.current.set(id, { element, body, props })
      },
      [debug]
    )

    const unregisterElement = useCallback((id: string) => {
      const item = bodiesMap.current.get(id)
      if (item) {
        World.remove(engine.current.world, item.body)
        bodiesMap.current.delete(id)
      }
    }, [])

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position
        const rotation = body.angle * (180 / Math.PI)
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`
      })
      frameId.current = requestAnimationFrame(updateElements)
    }, [])

    const initializeEngine = useCallback(() => {
      if (!containerRef.current) return
      const height = containerRef.current.offsetHeight
      const width = containerRef.current.offsetWidth

      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        Common.setDecomp(require("poly-decomp"))
      } catch {
        // optional
      }

      engine.current.gravity.x = gravity.x
      engine.current.gravity.y = gravity.y

      // Attach mouse to the container div (not a canvas) so pointer events work with HTML elements
      const mouse = Mouse.create(containerRef.current)
      mouseConstraint.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      })

      const walls = [
        Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
      ]
      if (addTopWall) {
        walls.push(Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, render: { visible: false } }))
      }

      if (grabCursor) {
        const touching = () =>
          Query.point(
            engine.current.world.bodies,
            mouseConstraint.current?.mouse.position || { x: 0, y: 0 }
          ).filter(b => !b.isStatic).length > 0

        Events.on(engine.current, "beforeUpdate", () => {
          if (containerRef.current) {
            containerRef.current.style.cursor = mouseDown.current
              ? touching() ? "grabbing" : "default"
              : touching() ? "grab" : "default"
          }
        })
        containerRef.current.addEventListener("mousedown", () => { mouseDown.current = true })
        containerRef.current.addEventListener("mouseup", () => { mouseDown.current = false })
      }

      World.add(engine.current.world, [mouseConstraint.current, ...walls])

      runner.current = Runner.create()
      updateElements()

      if (autoStart) {
        Runner.run(runner.current, engine.current)
        isRunning.current = true
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateElements, debug, autoStart, gravity, addTopWall, grabCursor])

    const clearEngine = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current)
      if (mouseConstraint.current) {
        Mouse.clearSourceEvents(mouseConstraint.current.mouse)
        World.remove(engine.current.world, mouseConstraint.current)
      }
      if (runner.current) Runner.stop(runner.current)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      bodiesMap.current.clear()
    }, [])

    const handleResize = useCallback(() => {
      if (!containerRef.current || !resetOnResize) return
      setCanvasSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight })
      clearEngine()
      initializeEngine()
    }, [clearEngine, initializeEngine, resetOnResize])

    const startEngine = useCallback(() => {
      if (runner.current) Runner.run(runner.current, engine.current)
      frameId.current = requestAnimationFrame(updateElements)
      isRunning.current = true
    }, [updateElements])

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return
      if (runner.current) Runner.stop(runner.current)
      if (frameId.current) cancelAnimationFrame(frameId.current)
      isRunning.current = false
    }, [])

    const reset = useCallback(() => {
      stopEngine()
      handleResize()
    }, [stopEngine, handleResize])

    useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [startEngine, stopEngine, reset])

    useEffect(() => {
      if (!resetOnResize) return
      const debouncedResize = debounce(handleResize, 500)
      window.addEventListener("resize", debouncedResize)
      return () => { window.removeEventListener("resize", debouncedResize); debouncedResize.cancel() }
    }, [handleResize, resetOnResize])

    useEffect(() => {
      initializeEngine()
      return clearEngine
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div ref={containerRef} className={cn("absolute top-0 left-0 w-full h-full", className)} {...props}>
          {children}
        </div>
      </GravityContext.Provider>
    )
  }
)

Gravity.displayName = "Gravity"
export { Gravity, MatterBody }
