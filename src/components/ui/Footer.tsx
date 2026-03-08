export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Andreas Billy Sutandi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/billy93"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
            >
              GitHub
            </a>
            <a
              href="mailto:billyfebram@gmail.com"
              className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
