"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathnName = usePathname();
  const [isOpen, setIsOpen] = useState(true); // State for mobile menu

  return (
    <header className="sticky top-0 z-50 mx-auto w-[90%] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <TransitionLink href="/" className="text-xl font-bold mr-10">
          BizIntel
        </TransitionLink>

        <nav
          className={`md:flex items-center gap-6 text-sm ${
            isOpen ? "flex" : "hidden"
          } md:block`}
        >
          <TransitionLink
            href="/"
            className={`transition-colors hover:text-foreground/80 ${
              pathnName === "/" ? "font-bold" : ""
            }`}
          >
            Home
          </TransitionLink>
          <TransitionLink
            href="/chat"
            className={`transition-colors hover:text-foreground/80 ${
              pathnName === "/chat" ? "font-bold" : ""
            }`}
          >
            AI Chat
          </TransitionLink>
          <TransitionLink
            href="/about"
            className={`transition-colors hover:text-foreground/80 ${
              pathnName === "/about" ? "font-bold" : ""
            }`}
          >
            About
          </TransitionLink>
        </nav>

        {/* <div className="flex items-center gap-4">
          {session ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div> */}
      </div>
    </header>
  );
}
