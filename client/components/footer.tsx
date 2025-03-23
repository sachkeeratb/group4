import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 mx-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} BizIntel. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/" className="hover:underline">
            Privacy
          </Link>
          <Link href="/" className="hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
