import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatInput({
  messages,
  setMessages,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const prompt = input;
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: prompt,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      toast.error(error.message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#111] p-4">
      {loading && (
        <p className="mb-3 text-sm text-gray-400">
          🤖 AI is thinking...
        </p>
      )}

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask your AI Coach anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-xl bg-[#1a1a1a] px-5 py-3 text-white outline-none placeholder:text-gray-500"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}