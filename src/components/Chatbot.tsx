import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import chatAvatar from "@/assets/sitecraft-logo-chat.png";
import logo from "@/assets/logo.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are SiteCraft's friendly customer assistant. You help potential customers understand our services and pricing.

Key Info:
- Starter Plan: ₹3,500 (3-4 pages, responsive, contact form, WhatsApp, basic SEO)
- Growth Plan: ₹5,000 (5-7 pages, Google Maps, gallery, advanced SEO) — MOST POPULAR
- Pro Plan: ₹8,000 (7-9 pages, blog, testimonials, analytics)
- Monthly maintenance: ₹500/month (optional)
- Contact: Phone 9833325983, Instagram @site_craft_2026
- Availability: Weekdays after 3 PM, Weekends full day
- Payment: UPI payments accepted
- Refund Policy: Full refund if work hasn't started, 50% if design is in progress
- We serve local businesses across India

Be helpful, concise, friendly. Use emojis sparingly. Encourage users to fill the lead form for a personalized quote.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm SiteCraft's assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const sendMessage = async () => {
    if (!input.trim() || streaming) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Chat is currently unavailable. Please contact us at 9833325983 or @site_craft_2026 on Instagram!" },
      ]);
      setStreaming(false);
      return;
    }

    try {
      const resp = await fetch(`${supabaseUrl}/functions/v1/sitecraft-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let assistantSoFar = "";
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > messages.length) {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (!assistantSoFar) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I couldn't generate a response. Please try again!" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again or call us at 9833325983!" },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!open && (
          <div className="bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border animate-fade-up">
            💬 Chat with us!
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Chat with us"
        >
          {open ? <X className="w-6 h-6" /> : <img src={logo} alt="Chat" className="w-8 h-8 rounded-full" />}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-card rounded-lg shadow-2xl border border-border flex flex-col animate-fade-up overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <img src={chatAvatar} alt="Bot" width={36} height={36} className="w-9 h-9 rounded-full" />
            <div>
              <p className="font-heading font-bold text-sm text-primary-foreground">SiteCraft Assistant</p>
              <p className="text-xs text-primary-foreground/70">Usually replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&>p]:m-0 [&>ul]:mt-1 [&>ol]:mt-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-lg px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" style={{ animation: "pulse-dot 1.2s infinite 0s" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" style={{ animation: "pulse-dot 1.2s infinite 0.2s" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" style={{ animation: "pulse-dot 1.2s infinite 0.4s" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="border-t border-border p-3 flex gap-2 flex-shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-secondary rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              disabled={streaming}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="bg-accent text-accent-foreground rounded-lg p-2.5 hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
