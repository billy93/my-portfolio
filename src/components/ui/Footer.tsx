export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#030712]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-500/30">&#47;&#47;</span>
            <p className="text-sm text-slate-600">
              &copy; {new Date().getFullYear()} Andreas Billy Sutandi
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/billy93"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-600 transition-colors hover:text-cyan-400"
            >
              GitHub
            </a>
            <a
              href="mailto:billyfebram@gmail.com"
              className="font-mono text-xs text-slate-600 transition-colors hover:text-cyan-400"
            >
              Email
            </a>
            <span className="font-mono text-xs text-cyan-500/20">AI-Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
