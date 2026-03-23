"use client";

import { useTheme } from "@/store/useTheme";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

export default function Navbar() {
  const { isDark } = useTheme();
  return (
    <header className="container mx-auto px-6 py-8 flex justify-between items-center bg-transparent">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">floweRsume</span>
        <span className="text-2xl font-bold">🌸</span>
      </div>
      {/* <nav className="hidden md:flex gap-8 font-medium"> */}
      {/*   {["Features", "Pricing", "About"].map((item) => ( */}
      {/*     <a */}
      {/*       key={item} */}
      {/*       href={`#${item.toLowerCase()}`} */}
      {/*       className="hover:text-primary transition-colors relative group" */}
      {/*     > */}
      {/*       {item} */}
      {/*       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" /> */}
      {/*     </a> */}
      {/*   ))} */}
      {/* </nav> */}
      <div className="flex gap-4">
        <Show when="signed-out">
          <SignInButton mode="redirect">
            <button className="px-5 py-2 rounded-full font-medium hover:bg-accent transition-colors cursor-pointer">
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <button className="px-5 py-2 bg-primary text-background rounded-full font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-md shadow-primary/20">
              Get Started
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              75 Credits
            </span>
          </div>
          <UserButton
            appearance={
              isDark
                ? {
                    theme: dark,
                  }
                : {}
            }
          />
        </Show>
      </div>
    </header>
  );
}
