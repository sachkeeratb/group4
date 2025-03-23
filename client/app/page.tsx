import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import TransitionLink from "@/components/TransitionLink";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="my-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            How AI Transforms Business Management
          </h2>
          <TextGenerateEffect words="Explore the intersection of advancements in artificial intelligence and business management principles" />
        </div>
      </section>

      <section className="bg-muted py-16 rounded-lg my-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Using BizIntel Today
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Ask questions, apply business tools, and enhance your understanding
            of business management concepts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="lg">
              <TransitionLink href="/chat">Try AI Chat</TransitionLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
