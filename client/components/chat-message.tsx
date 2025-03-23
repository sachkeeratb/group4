import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import ReactMarkdown from "react-markdown";

type ChatMessageProps = {
  message: {
    content: string;
    role: "user" | "assistant";
    timestamp?: Date;
  };
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex items-start gap-4", {
        "flex-row-reverse": isUser,
      })}
    >
      <Avatar className="mt-1">
        {isUser ? (
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        ) : (
          <>
            <AvatarImage src="/logo-small.png" alt="BizIntel" />
            <AvatarFallback className="bg-muted">AI</AvatarFallback>
          </>
        )}
      </Avatar>

      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        {message.timestamp && (
          <div
            className={cn(
              "text-xs mt-2",
              isUser ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
}
