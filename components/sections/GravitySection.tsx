"use client";

import { Gravity, MatterBody } from "@/components/ui/gravity";

const pills = [
  { label: "SQL",         color: "#1A56FF", textColor: "#fff" },
  { label: "Python",      color: "#0DBF6B", textColor: "#fff" },
  { label: "dbt",         color: "#E8272A", textColor: "#fff" },
  { label: "BigQuery",    color: "#1A56FF", textColor: "#fff" },
  { label: "Tableau",     color: "#E8272A", textColor: "#fff" },
  { label: "Power BI",    color: "#FFD000", textColor: "#111" },
  { label: "Figma",       color: "#0DBF6B", textColor: "#fff" },
  { label: "GCP",         color: "#1A56FF", textColor: "#fff" },
  { label: "Illustrator", color: "#E8272A", textColor: "#fff" },
  { label: "Pandas",      color: "#0DBF6B", textColor: "#fff" },
  { label: "Excel",       color: "#FFD000", textColor: "#111" },
  { label: "Canva",       color: "#E8272A", textColor: "#fff" },
];

// Spread starting positions
const positions = [
  { x: "10%", y: "20%" }, { x: "30%", y: "10%" }, { x: "55%", y: "15%" },
  { x: "75%", y: "10%" }, { x: "85%", y: "25%" }, { x: "20%", y: "40%" },
  { x: "45%", y: "30%" }, { x: "65%", y: "35%" }, { x: "15%", y: "60%" },
  { x: "40%", y: "55%" }, { x: "70%", y: "50%" }, { x: "88%", y: "45%" },
];

export default function GravitySection() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden bg-surface/50 border-y border-ink/6 my-4">
      <Gravity gravity={{ x: 0, y: 0.8 }} className="w-full h-full" grabCursor>
        {pills.map((pill, i) => (
          <MatterBody
            key={pill.label}
            x={positions[i % positions.length].x}
            y={positions[i % positions.length].y}
            matterBodyOptions={{ friction: 0.3, restitution: 0.5, density: 0.002 }}
          >
            <div
              className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap select-none cursor-grab active:cursor-grabbing"
              style={{ backgroundColor: pill.color, color: pill.textColor }}
            >
              {pill.label}
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}
