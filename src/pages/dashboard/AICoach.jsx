import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import ChatBubble from "../../components/ai/ChatBubble";
import ChatInput from "../../components/ai/ChatInput";
import SuggestionCards from "../../components/ai/SuggestionCards";

export default function AICoach() {
  const [collapsed, setCollapsed] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your AI Fitness Coach. Ask me anything about workouts, nutrition, or fitness."
    }
  ]);

  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`transition-all duration-300 ${
          collapsed ? "ml-24" : "ml-72"
        }`}
      >
        <div className="mx-auto flex h-screen max-w-5xl flex-col p-8">

          <h1 className="text-5xl font-bold text-white">
            AI Coach
          </h1>

          <p className="mt-2 text-gray-400">
            Your personal fitness assistant.
          </p>

          <SuggestionCards />

          <div className="mt-6 flex-1 space-y-4 overflow-y-auto rounded-2xl bg-[#111] p-6">

            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                sender={message.sender}
                text={message.text}
              />
            ))}

          </div>

          <ChatInput
            messages={messages}
            setMessages={setMessages}
          />

        </div>
      </main>
    </div>
  );
}