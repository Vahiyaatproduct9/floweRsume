"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";

export default function CTA() {
  const imageUrl =
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="py-24 bg-accent/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-card border border-border rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/5"
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Side */}
            <div className="w-full lg:w-5/12 h-100 lg:h-auto self-stretch relative p-6">
              <div className="relative w-full h-full rounded-4xl overflow-hidden shadow-xl">
                <Image
                  src={imageUrl}
                  alt="Professional Growth"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-graient-to-t from-primary/20 to-transparent pointer-events-none" />
              </div>

              {/* Decorative blob behind image */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary/20 blur-[60px] rounded-full" />
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12 p-8 md:p-16 text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to <span className="text-primary italic">bloom</span> in
                your career?
              </h2>
              <p className="text-muted text-lg mb-10 max-w-xl">
                Join thousands of professionals using floweRsume to land their
                dream jobs. We{"'"}d love to hear your thoughts!
              </p>

              <form
                className="space-y-4 max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all group-hover:border-primary/30"
                    required
                  />
                </div>
                <div className="relative group">
                  <textarea
                    placeholder="What do you have to say?"
                    rows={3}
                    className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none group-hover:border-primary/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-background rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
