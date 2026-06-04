import { Cpu, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-primary" />
          <span className="font-mono text-sm text-primary font-bold">AY_</span>
          <span className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Arpit Yadav</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/arpit-yadav" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={18} /></a>
          <a href="https://linkedin.com/in/arpit-yadav" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
          <a href="mailto:arpit.yadav@outlook.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={18} /></a>
        </div>
        <p className="text-[10px] text-muted-foreground/40">Designed with a simulation-first mindset</p>
      </div>
    </footer>
  );
}
