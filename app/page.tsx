"use client";

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, BehanceIcon } from "@/components/ui/Icons";

/* ── data ─────────────────────────────────────────────────── */
const dataProjects   = PROJECTS.filter(p => p.category === "data");
const designProjects = PROJECTS.filter(p => p.category === "design");

const tagStyle: Record<string, string> = {
  blue:   "bg-blue/10 text-blue",
  green:  "bg-green/10 text-green",
  yellow: "bg-yellow/30 text-ink",
  red:    "bg-red/10 text-red",
};
const dotColor: Record<string, string> = {
  blue: "bg-blue", green: "bg-green", yellow: "bg-yellow", red: "bg-red",
};
const hoverBorder: Record<string, string> = {
  blue:   "hover:border-blue/40",
  green:  "hover:border-green/40",
  yellow: "hover:border-yellow/60",
  red:    "hover:border-red/40",
};

const techStack = [
  { label: "SQL",         bg: "bg-blue",      text: "text-white"  },
  { label: "Python",      bg: "bg-green",     text: "text-white"  },
  { label: "BigQuery",    bg: "bg-blue/12",   text: "text-blue"   },
  { label: "Tableau",     bg: "bg-red/10",    text: "text-red"    },
  { label: "Power BI",    bg: "bg-yellow",    text: "text-ink"    },
  { label: "Pandas",      bg: "bg-green/15",  text: "text-green"  },
  { label: "Excel",       bg: "bg-green/10",  text: "text-green"  },
  { label: "Canva",       bg: "bg-red",       text: "text-white"  },
  { label: "Photoshop",   bg: "bg-blue/15",   text: "text-blue"   },
  { label: "Illustrator", bg: "bg-yellow/50", text: "text-ink"    },
];

/* ── sticker ──────────────────────────────────────────────── */
type StickerProps = {
  symbol: string
  color: string
  bg: string
  size?: string
  rotate?: string
  style?: React.CSSProperties
  className?: string
}
function Sticker({ symbol, color, bg, size = "text-sm", rotate = "rotate-6", style, className = "" }: StickerProps) {
  return (
    <span
      className={`absolute inline-flex items-center justify-center w-8 h-8 rounded-full ${bg} ${color} ${size} font-black select-none pointer-events-none ${rotate} shadow-sm ${className}`}
      style={style}
      aria-hidden
    >
      {symbol}
    </span>
  );
}

/* ── hooks ────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── org logo ─────────────────────────────────────────────── */
function OrgLogo({ src, alt, bg }: { src: string; alt: string; bg?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative w-10 h-10 rounded-full ${bg ?? "bg-ink/5"} border border-ink/10 flex items-center justify-center overflow-hidden shadow-sm`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-ink/8 rounded-full" />}
      <Image src={src} alt={alt} width={36} height={36}
        className={`w-full h-full object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)} />
    </div>
  );
}

/* ── project card ─────────────────────────────────────────── */
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <article className={`group flex flex-col rounded-2xl border border-ink/8 overflow-hidden bg-white ${hoverBorder[project.color]} hover:shadow-2xl hover:shadow-ink/10 hover:-translate-y-2 transition-all duration-300`}>
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        {project.image ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-ink/8 z-10" />}
            <Image src={project.image} alt={project.title} fill
              className={`object-cover object-top transition-all duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              onLoad={() => setImgLoaded(true)} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-${project.color}/8`}>
            <svg className="w-8 h-8 text-ink/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
        <span className={`absolute top-3 left-3 w-2 h-2 rounded-full ${dotColor[project.color]} shadow-sm`} />
      </div>
      <div className="flex flex-wrap gap-1.5 px-4 pt-4">
        {project.tags.map(tag => (
          <span key={tag} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${tagStyle[project.color]}`}>{tag}</span>
        ))}
      </div>
      <p className="px-4 pt-2 text-xs text-muted leading-relaxed flex-1">{project.description}</p>
      <div className="px-4 pt-3 pb-4 border-t border-ink/6 mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-0.5">{project.subtitle}</p>
          <h3 className="font-black text-base text-ink leading-tight">{project.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-ink/20 hover:text-white hover:bg-blue transition-all">
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
          {project.behanceUrl && (
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`${project.title} on Behance`}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-ink/20 hover:text-white hover:bg-blue transition-all">
              <BehanceIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── page ─────────────────────────────────────────────────── */
export default function Home() {
  const [wiggling,      setWiggling]      = useState(false);
  const [showTop,       setShowTop]       = useState(false);
  const [polaroidLoaded, setPolaroidLoaded] = useState(false);
  const aboutRef    = useReveal();
  const projectsRef = useReveal();

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const triggerWiggle = () => {
    setWiggling(true);
    setTimeout(() => setWiggling(false), 500);
  };

  return (
    <>
      <main>

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section aria-label="Intro" className="relative min-h-screen overflow-x-clip overflow-y-visible">
          <div className="w-full px-6 sm:px-[7vw]
            grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 min-h-screen overflow-visible">

            {/* ── Left: text — vertically centred ── */}
            <div className="self-center flex flex-col justify-center py-24">
              <div className="inline-flex items-center gap-2 bg-green/10 text-green px-3 py-1.5 rounded-full w-fit mb-7 border border-green/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <span className="font-bold" style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.95rem)" }}>Open to work</span>
              </div>

              <div className="relative inline-block mb-6">
                <h1 className="font-black leading-[0.86] tracking-tight select-none"
                  style={{ fontSize: "clamp(2.8rem, 7.5vw, 11rem)" }}>
                  <span className="text-ink block">hi!</span>
                  <span className="text-ink">my name is{" "}</span>
                  <span className="text-red whitespace-nowrap">
                    ina
                    <button onClick={triggerWiggle}
                      className="inline-block cursor-pointer bg-transparent border-0 p-0 ml-1"
                      aria-label="Wiggle"
                      style={{ fontSize: "inherit", lineHeight: "inherit" }}>
                      <span className={`inline-block ${wiggling ? "wiggle" : ""} hover:scale-110 transition-transform duration-200 origin-bottom`}>◡̈</span>
                    </button>
                  </span>
                </h1>
                <Sticker symbol="✦" color="text-ink" bg="bg-yellow" rotate="-rotate-12"
                  className="-top-3 -right-2" />
              </div>

              <p className="text-muted font-normal max-w-[28rem] leading-relaxed mb-8"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.5rem)" }}>
                Manila-based creative who happens to be really good with numbers too.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#projects"
                  className="px-6 py-3 rounded-full bg-blue text-white font-semibold hover:bg-ink transition-colors duration-200 shadow-md shadow-blue/20"
                  style={{ fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }}>
                  See my work
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-6 py-3 rounded-full bg-yellow text-ink font-semibold hover:bg-red hover:text-white transition-all duration-200 shadow-md shadow-yellow/25"
                  style={{ fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }}>
                  Get in touch
                </a>
              </div>

              <div className="flex items-center gap-2 text-muted/40" style={{ fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)" }}>
                <span>✦</span>
                <span className="font-medium tracking-wide">scroll to explore</span>
              </div>
            </div>

            {/* ── Right: polaroid — bleeds off top only ── */}
            <div className="hidden lg:block self-start overflow-visible">
              <div className="relative -mt-16 pb-20 overflow-visible w-full">

                {/* Polaroid tilt: starts right, tilts left on hover */}
                <div
                  className="transition-transform duration-500 ease-out cursor-default"
                  style={{ transform: "rotate(3deg)", transformOrigin: "center center" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(-3deg)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(3deg)"; }}
                >
                  <div className="relative bg-white p-3 pb-14 shadow-2xl shadow-ink/25"
                    style={{ borderRadius: "3px" }}>

                    {/* Square photo */}
                    <div className="relative overflow-hidden aspect-square" style={{ borderRadius: "2px" }}>
                      {!polaroidLoaded && <div className="absolute inset-0 animate-pulse bg-ink/8 z-10" />}
                      <Image
                        src="/ina3.jpg"
                        alt="Ina Louise Magno"
                        width={1200}
                        height={1200}
                        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${polaroidLoaded ? "opacity-100" : "opacity-0"}`}
                        style={{ display: "block" }}
                        priority
                        onLoad={() => setPolaroidLoaded(true)}
                      />
                    </div>

                    {/* Stickers ON the photo */}
                    <Sticker symbol="✦" color="text-ink" bg="bg-yellow" rotate="-rotate-12"
                      className="top-5 right-5 w-9 h-9 text-base" />
                    <Sticker symbol="★" color="text-white" bg="bg-blue" rotate="rotate-6"
                      className="top-5 left-5 w-8 h-8 text-sm" />
                    <Sticker symbol="✿" color="text-white" bg="bg-green" rotate="-rotate-6"
                      style={{ top: "40%", right: "1rem" }}
                      className="w-8 h-8 text-sm" />
                    <Sticker symbol="☘" color="text-white" bg="bg-red" rotate="rotate-12"
                      style={{ top: "60%", left: "0.75rem" }}
                      className="w-8 h-8 text-sm" />
                    <Sticker symbol="✺" color="text-ink" bg="bg-yellow" rotate="-rotate-6"
                      style={{ bottom: "4rem", right: "0.75rem" }}
                      className="w-7 h-7 text-xs" />

                    {/* Badges */}
                    <div
                      className="absolute bg-blue text-white px-3 py-1.5 shadow-lg shadow-blue/30 z-10"
                      style={{
                        top: "calc(3px + (100% - 14px - 56px) * 0.25)",
                        left: "-1rem",
                        borderRadius: "1rem",
                        transform: "rotate(-4deg)",
                      }}
                    >
                      <span className="text-[11px] font-bold">Data Analyst</span>
                    </div>

                    <div
                      className="absolute bg-red text-white px-3 py-1.5 shadow-lg shadow-red/30 z-10"
                      style={{
                        top: "calc(3px + (100% - 14px - 56px) * 0.75)",
                        right: "-1rem",
                        borderRadius: "1rem",
                        transform: "rotate(3deg)",
                      }}
                    >
                      <span className="text-[11px] font-bold">Creative ✦</span>
                    </div>

                    <p className="text-center text-xs font-medium text-ink/30 mt-3 tracking-wide font-mono">
                      hanoi, 2024
                    </p>
                  </div>

                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-yellow/55 rounded-sm rotate-1 shadow-sm" />
                </div>

              </div>
            </div>

            {/* Mobile-only photo */}
            <div className="lg:hidden flex justify-center pb-16">
              <div className="relative" style={{ width: "min(300px, 80vw)" }}>
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{ transform: "rotate(-3deg)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(3deg)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(-3deg)"; }}
                >
                  <div className="bg-white p-3 pb-10 shadow-2xl shadow-ink/25" style={{ borderRadius: "3px" }}>
                    <div className="relative aspect-square overflow-hidden" style={{ borderRadius: "2px" }}>
                      {!polaroidLoaded && <div className="absolute inset-0 animate-pulse bg-ink/8 z-10" />}
                      <Image src="/ina3.jpg" alt="Ina Louise Magno" width={600} height={600}
                        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${polaroidLoaded ? "opacity-100" : "opacity-0"}`}
                        style={{ display: "block" }} priority
                        onLoad={() => setPolaroidLoaded(true)} />
                    </div>
                    <p className="text-center text-xs font-medium text-ink/30 mt-2 tracking-wide font-mono">hanoi, 2024</p>
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow/55 rounded-sm rotate-1" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            ABOUT + TOOLS
        ════════════════════════════════════════════════ */}
        <section
          id="about"
          ref={aboutRef as React.RefObject<HTMLElement>}
          aria-label="About"
          className="reveal"
        >
          <div className="px-6 sm:px-[7vw] py-20">

            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center text-[10px] font-black text-ink shrink-0">✦</span>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">About me</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left: pull quote + bio + links */}
              <div>
                <div className="relative mb-6">
                  <span className="absolute -top-4 -left-2 text-[6rem] font-black text-ink/5 leading-none select-none pointer-events-none">&ldquo;</span>
                  <p className="relative font-black text-ink leading-[1.1] tracking-tight"
                    style={{ fontSize: "clamp(1.35rem, 2.8vw, 3.5rem)" }}>
                    i&apos;ve always been curious.{" "}
                    <span className="text-blue">turns out you can build a career on that.</span>
                  </p>
                  <Sticker symbol="☘" color="text-white" bg="bg-green" rotate="rotate-6"
                    className="-right-4 top-0 w-7 h-7 text-xs" />
                </div>
                <p className="text-muted leading-relaxed mb-8 w-full" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.25rem)" }}>
                  {PERSONAL_INFO.bio}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-blue transition-colors shadow-sm">
                    <GitHubIcon className="w-4 h-4" /> GitHub
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red text-white text-sm font-semibold hover:bg-ink transition-all shadow-sm">
                    <LinkedInIcon className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>

              {/* Right: experience card + tools card */}
              <div className="flex flex-col gap-5">

                {/* Experience & Education card */}
                <div className="relative bg-white border border-ink/8 px-6 py-5 shadow-sm"
                  style={{ borderRadius: "1.5rem 2.5rem 1.5rem 2.5rem" }}>
                  <Sticker symbol="★" color="text-white" bg="bg-blue" rotate="-rotate-6"
                    className="-top-3 -right-3 w-7 h-7 text-xs" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-blue rounded-full inline-block" />Experience &amp; Education
                  </p>
                  <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-ink/8" />
                    <div className="flex flex-col">
                      {EXPERIENCES.map((exp, i) => (
                        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                          <div className="relative z-10 shrink-0">
                            {exp.logo ? (
                              <OrgLogo src={exp.logo} alt={exp.org} bg={exp.logoBg} />
                            ) : (
                              <div className={`w-10 h-10 rounded-full ${exp.logoBg ?? "bg-ink/5"} border border-ink/10 flex items-center justify-center shadow-sm`}>
                                <span className="text-xs font-black text-ink/30">{exp.org[0]}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                              <span className="font-black text-ink text-sm">{exp.org}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                exp.type === "training" ? "bg-green/10 text-green" :
                                exp.type === "education" ? "bg-blue/10 text-blue" :
                                "bg-yellow/30 text-ink"
                              }`}>{exp.type}</span>
                            </div>
                            <p className="text-xs font-semibold text-muted">{exp.role}</p>
                            <p className="text-[10px] text-muted/50 mb-1">{exp.period}</p>
                            <p className="text-xs text-muted leading-relaxed">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tools card */}
                <div className="relative bg-white border border-ink/8 px-6 py-5 shadow-sm"
                  style={{ borderRadius: "2.5rem 1.5rem 2.5rem 1.5rem" }}>
                  <Sticker symbol="✦" color="text-ink" bg="bg-yellow" rotate="rotate-12"
                    className="-top-3 -left-3 w-7 h-7 text-xs" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-4 flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-green rounded-full inline-block" />Tools &amp; Tech
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map(({ label, bg, text }) => (
                      <span key={label}
                        className={`${bg} ${text} px-3.5 py-1.5 rounded-full text-xs font-semibold hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 cursor-default`}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PROJECTS
        ════════════════════════════════════════════════ */}
        <section
          id="projects"
          ref={projectsRef as React.RefObject<HTMLElement>}
          aria-label="Projects"
          className="reveal"
        >
          <div className="px-6 sm:px-[7vw] py-20">

            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-red flex items-center justify-center text-[10px] font-black text-white shrink-0">✦</span>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">Work</p>
            </div>
            <div className="relative inline-block mb-16">
              <h2 className="font-black text-ink leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(3rem, 8vw, 11rem)" }}>
                projects<span className="text-red">.</span>
              </h2>
              <Sticker symbol="✿" color="text-white" bg="bg-green" rotate="-rotate-12"
                className="-top-4 -right-6 w-9 h-9 text-base" />
            </div>

            {/* Data */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-blue" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-muted">Data &amp; Analytics</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dataProjects.map((p, i) => {
                  const dataStickers = [
                    { symbol: "✦", bg: "bg-yellow", color: "text-ink",   rotate: "-rotate-12", pos: "-top-3 -right-3" },
                    { symbol: "★", bg: "bg-blue",   color: "text-white", rotate: "rotate-6",   pos: "-bottom-3 -left-3" },
                    { symbol: "✿", bg: "bg-green",  color: "text-white", rotate: "-rotate-6",  pos: "-top-3 left-6" },
                  ];
                  const s = dataStickers[i % dataStickers.length];
                  return (
                    <div key={p.title} className="relative">
                      <ProjectCard project={p} />
                      <span className={`absolute ${s.pos} w-8 h-8 rounded-full ${s.bg} ${s.color} text-sm font-black flex items-center justify-center ${s.rotate} shadow-sm z-10 select-none pointer-events-none`}>
                        {s.symbol}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Design */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-red" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-muted">Design</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {designProjects.map((p, i) => {
                  const designStickers = [
                    { symbol: "☘", bg: "bg-red",    color: "text-white", rotate: "rotate-12",  pos: "-top-3 -left-3" },
                    { symbol: "✺", bg: "bg-yellow", color: "text-ink",   rotate: "-rotate-6",  pos: "-bottom-3 -right-3" },
                    { symbol: "★", bg: "bg-green",  color: "text-white", rotate: "rotate-6",   pos: "-top-3 right-6" },
                  ];
                  const s = designStickers[i % designStickers.length];
                  return (
                    <div key={p.title} className="relative">
                      <ProjectCard project={p} />
                      <span className={`absolute ${s.pos} w-8 h-8 rounded-full ${s.bg} ${s.color} text-sm font-black flex items-center justify-center ${s.rotate} shadow-sm z-10 select-none pointer-events-none`}>
                        {s.symbol}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════════════ */}
        <section id="contact" aria-label="Contact"
          className="px-6 sm:px-[7vw] pb-24">
          <div className="relative bg-ink px-8 sm:px-14 py-14
            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 overflow-hidden"
            style={{ borderRadius: "2rem 3rem 2rem 3rem" }}>

            {/* Stickers inside contact card */}
            <div className="absolute top-4 right-20 w-8 h-8 rounded-full bg-yellow/20 flex items-center justify-center text-yellow text-sm font-black -rotate-12 select-none pointer-events-none">✦</div>
            <div className="absolute bottom-4 left-12 w-7 h-7 rounded-full bg-blue/20 flex items-center justify-center text-blue/60 text-xs font-black rotate-12 select-none pointer-events-none">★</div>
            <div className="absolute top-6 left-1/3 w-6 h-6 rounded-full bg-red/20 flex items-center justify-center text-red/50 text-xs font-black -rotate-6 select-none pointer-events-none">✿</div>

            <div className="relative z-10">
              <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-3">Let&apos;s talk</p>
              <p className="font-black text-white leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 4.5rem)" }}>
                Got a project?{" "}<span className="text-yellow">Say hello.</span>
              </p>
            </div>
            <a href={`mailto:${PERSONAL_INFO.email}`}
              className="relative z-10 shrink-0 px-7 py-3.5 rounded-full bg-yellow text-ink text-sm font-bold hover:bg-white transition-all shadow-lg shadow-yellow/20">
              {PERSONAL_INFO.email}
            </a>
          </div>
        </section>

      </main>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center shadow-lg hover:bg-blue hover:scale-110 transition-all duration-200 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  );
}
