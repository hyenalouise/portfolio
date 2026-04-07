import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="bg-blue py-10 px-6 sm:px-[7vw]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <Link href="/" className="font-black text-sm text-white tracking-tight hover:text-yellow transition-colors">
          ILM<span className="text-yellow">.</span>
        </Link>
        <div className="flex items-center gap-2">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="w-8 h-8 rounded-full bg-white/10 text-white/70 flex items-center justify-center hover:bg-white hover:text-blue transition-all">
            <GitHubIcon className="w-3.5 h-3.5" />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="w-8 h-8 rounded-full bg-white/10 text-white/70 flex items-center justify-center hover:bg-white hover:text-blue transition-all">
            <LinkedInIcon className="w-3.5 h-3.5" />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`}
            className="ml-1 px-4 py-2 rounded-full bg-yellow text-ink text-xs font-bold hover:bg-white transition-all">
            Say hello
          </a>
        </div>
      </div>
    </footer>
  );
}
