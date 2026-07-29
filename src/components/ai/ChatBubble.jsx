import { Bot, User } from "lucide-react";

export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

return (
  <div
    className={`flex ${
      isUser ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`flex max-w-[80%] gap-3 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border text-foreground"
        }`}
      >
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      {/* Message */}
      <div
        className={`rounded-2xl border px-5 py-4 ${
          isUser
            ? "rounded-br-md border-primary bg-primary text-primary-foreground"
            : "rounded-bl-md border-border bg-card text-foreground"
        }`}
      >
        <p className="whitespace-pre-wrap leading-7">
          {text}
        </p>
      </div>
    </div>
  </div>
);
}