"use client";

import { motion } from "framer-motion";
import { Sparkles, FileText, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{
        background: `linear-gradient(to top, var(--background), transparent), url('https://w.wallhaven.cc/full/jx/wallhaven-jxzgyw.jpg')`,
      }}
      className="relative pt-20 pb-32 overflow-hidden bg-cover bg-center"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-accent text-primary rounded-full">
              AI-Powered Resume Builder
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Build your dream career with{" "}
              <span className="text-primary italic relative">
                floweRsume
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The ultimate AI resume reviewer and builder that helps you stand out
            from the crowd and beat the ATS with ease.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="px-8 py-4 bg-foreground text-background rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
              Review My Resume
            </button>
            <button className="px-8 py-4 bg-background border-2 border-border rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer">
              <FileText className="w-5 h-5 text-muted" />
              Build From Scratch
            </button>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-20">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "AI Optimization",
                desc: "Get instant, intelligent feedback on your resume based on industry standards.",
                color: "bg-pink-100 dark:bg-pink-900/30",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "ATS Checker",
                desc: "Ensure your resume passes through automated filters by optimizing keywords.",
                color: "bg-blue-100 dark:bg-blue-900/30",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Modern Templates",
                desc: "Choose from a collection of professionally designed templates.",
                color: "bg-purple-100 dark:bg-purple-900/30",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-primary mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full"
        />
      </div>
    </section>
  );
}
