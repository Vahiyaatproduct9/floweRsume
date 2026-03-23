export default function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">floweRsume</span>
          <span className="text-xl font-bold">🌸</span>
        </div>
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} floweRsume. All rights reserved. Built with Bun and Elysia.
        </p>
        <div className="flex gap-6">
          {["Twitter", "GitHub", "Discord"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-muted hover:text-primary transition-colors font-medium"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
