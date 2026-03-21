import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-pink-500">floweRsume</span>
          <span className="text-2xl font-bold">🌸</span>
        </div>
        <nav className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-pink-500 transition-colors">Features</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Pricing</a>
          <a href="#" className="hover:text-pink-500 transition-colors">About</a>
        </nav>
        <div className="flex gap-4">
          <button className="px-5 py-2 rounded-full font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
            Log in
          </button>
          <button className="px-5 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors">
            Get Started
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Build your dream career with <span className="text-pink-500 italic">floweRsume</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
            The AI-powered resume reviewer and builder that helps you stand out from the crowd and beat the ATS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
            <button className="px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
              Review My Resume
            </button>
            <button className="px-8 py-4 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
              Build From Scratch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-20">
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-2xl mb-6">
                ✨
              </div>
              <h3 className="text-xl font-bold mb-3">AI Optimization</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Get instant, intelligent feedback on your resume based on industry standards and top hiring criteria.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-2xl mb-6">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-3">ATS Checker</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Ensure your resume passes through automated filters by optimizing keywords and formatting.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl mb-6">
                🎨
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Templates</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Choose from a collection of professionally designed templates that are both beautiful and functional.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-pink-500">floweRsume</span>
            <span className="text-xl font-bold">🌸</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            © 2026 floweRsume. All rights reserved. Built with Bun and Elysia.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-500 hover:text-pink-500 transition-colors">Twitter</a>
            <a href="#" className="text-zinc-500 hover:text-pink-500 transition-colors">GitHub</a>
            <a href="#" className="text-zinc-500 hover:text-pink-500 transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
