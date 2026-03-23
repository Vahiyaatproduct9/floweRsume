import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="absolute top-0 left-0 right-0 bg-red-600"></div>
        <div id="features">
          <Hero />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
