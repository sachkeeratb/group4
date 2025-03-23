"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/chat-message";
import { ToolSelector } from "@/components/tool-selector";
import { sendChatMessage } from "@/lib/api";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("freeform");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedTool, setSelectedTool] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentChatId, setCurrentChatId] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: input,
        tool: activeTab === "tools" ? selectedTool : null,
        userId: session?.user?.id || undefined,
        chatId: currentChatId,
      });

      if (response.chatId) {
        setCurrentChatId(response.chatId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.reply,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6">
        Business Management AI Assistant
      </h1>

      <Tabs defaultValue="freeform" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="freeform">Ask Anything</TabsTrigger>
          <TabsTrigger value="tools">Business Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="freeform" className="mt-0">
          <p className="mb-4">
            Ask any business management question, and get answers using
            Artificial Intelligence.
          </p>
        </TabsContent>

        <TabsContent value="tools" className="mt-0">
          <p className="mb-4">
            Apply specific business tools from Paul Hoang's textbook to analyze
            business situations.
          </p>
          <ToolSelector
            selectedTool={selectedTool}
            onSelectTool={setSelectedTool}
          />
        </TabsContent>
      </Tabs>

      <Card className="p-4 h-[500px] mb-4 overflow-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              No messages yet. Start a conversation!
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            activeTab === "freeform"
              ? "Ask about any business management concept..."
              : `Ask about applying ${selectedTool || "a business tool"}...`
          }
          disabled={isLoading || (activeTab === "tools" && !selectedTool)}
        />
        <Button
          type="submit"
          disabled={
            isLoading ||
            !input.trim() ||
            (activeTab === "tools" && !selectedTool)
          }
        >
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </form>

      {!session && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Your chat history will be lost when you close this page.
        </p>
      )}
    </div>
  );
}
