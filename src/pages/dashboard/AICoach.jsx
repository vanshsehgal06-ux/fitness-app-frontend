import { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/dashboard/Sidebar.jsx";
import ChatBubble from "../../components/ai/ChatBubble.jsx";
import ChatInput from "../../components/ai/ChatInput.jsx";
import SuggestionCards from "../../components/ai/SuggestionCards.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function AICoach() {
  const [collapsed, setCollapsed] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/ai/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        setMessages([
          {
            sender: "ai",
            text: "Hi! 👋 I'm your AI Fitness Coach. Ask me anything about workouts, nutrition, or fitness.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);

      setMessages([
        {
          sender: "ai",
          text: "Hi! 👋 I'm your AI Fitness Coach. Ask me anything about workouts, nutrition, or fitness.",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <main
        className={`transition-all duration-300 ${
          collapsed ? "ml-24" : "ml-72"
        }`}>

        <div className="mx-auto flex h-screen max-w-5xl flex-col p-8">
          <h1 className="text-5xl font-bold text-foreground">
            AI Coach
          </h1>

          <p className="mt-2 text-muted-foreground">
            Your personal fitness assistant.
          </p>

          {messages.length <= 1 && (
          <SuggestionCards
            onSuggestionClick={(prompt) => setInput(prompt)}/>
          )}

          <div
  className={`mt-6 overflow-y-auto rounded-2xl border border-border bg-card p-6 transition-all duration-500 ${
    messages.length <= 1
      ? "h-[420px]"
      : "h-[650px]"
  }`}
>
  <div className="space-y-4">
    {messages.map((message, index) => (
      <ChatBubble
        key={index}
        sender={message.sender}
        text={message.text}
      />
    ))}

    <div ref={bottomRef} />
  </div>
</div>

          <ChatInput input={input} setInput={setInput} messages={messages} setMessages={setMessages}/>
        </div>
      </main>
    </div>
  );
}