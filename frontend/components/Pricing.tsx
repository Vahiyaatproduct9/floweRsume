"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "0",
    credits: "1 Credit",
    description: "Perfect for a quick review.",
    features: [
      "1 AI Resume Generation",
      "Basic ATS Check",
      "Standard Templates",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "400",
    credits: "120 Credits",
    description: "The best value for power users.",
    features: [
      "20 + 4 Bonus Generations",
      "Deep AI Optimization",
      "Unlimited PDF Exports",
      "Custom Branding",
      "24/7 Priority Support",
    ],
    cta: "Go Pro",
    popular: true,
    pitch: "Get 20 extra credits for 400/-",
  },
  {
    name: "Starter",
    price: "99",
    credits: "20 Credits",
    description: "Great for active job seekers.",
    features: [
      "4 AI Resume Generations",
      "Advanced ATS Analysis",
      "Priority Support",
      "All Premium Templates",
    ],
    cta: "Get Started",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Credit-Based Pricing
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Choose the plan that fits your career goals. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${
                tier.popular
                  ? "border-primary shadow-xl shadow-primary/5 bg-card scale-105 z-10"
                  : "border-border bg-card"
              }`}
            >
              {tier.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Best Value
                </span>
              )}

              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{tier.price}/-</span>
                  </div>
                  <p className="text-primary font-semibold mt-2">
                    {tier.credits}
                  </p>
                  {tier.pitch && (
                    <p className="text-sm text-secondary font-medium mt-1 italic">
                      {tier.pitch}
                    </p>
                  )}
                  <p className="text-muted mt-4 text-sm">{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-4 rounded-xl font-bold transition-all cursor-pointer ${
                  tier.popular
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
