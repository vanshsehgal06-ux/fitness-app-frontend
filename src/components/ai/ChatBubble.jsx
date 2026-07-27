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
              ? "bg-white text-black"
              : "bg-blue-600 text-white"
          }`}
        >
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Message */}
        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? "bg-white text-black rounded-br-md"
              : "bg-[#1a1a1a] text-white rounded-bl-md"
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