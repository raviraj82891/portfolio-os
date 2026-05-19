'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export default function GeminiChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'system',
      content: 'Welcome to AI Chat. I am ready to assist you. Type your message below.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationHistory = useRef<{ role: string; parts: { text: string }[] }[]>([]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    conversationHistory.current.push({
      role: 'user',
      parts: [{ text: userMessage.content }],
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: conversationHistory.current }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      const aiText = data.text;

      if (!aiText) {
        throw new Error('No response generated.');
      }

      conversationHistory.current.push({
        role: 'model',
        parts: [{ text: aiText }],
      });

      const assistantMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred';
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'system',
        content: `⚠ Error: ${errorMessage}`,
        timestamp: new Date(),
      }]);
      conversationHistory.current.pop();
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: `sys-${Date.now()}`,
      role: 'system',
      content: 'Chat cleared. Start a new conversation.',
      timestamp: new Date(),
    }]);
    conversationHistory.current = [];
  };

  const formatContent = (content: string) => {
    let formatted = content;
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300 font-semibold">$1</strong>');
    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-white/[0.06] px-1.5 py-0.5 rounded-md text-violet-300 text-xs font-mono">$1</code>');
    // Code blocks
    formatted = formatted.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
      return `<pre class="bg-black/30 border border-white/[0.05] rounded-lg p-3 my-2 overflow-x-auto"><code class="text-violet-300 text-xs font-mono whitespace-pre">${code.trim()}</code></pre>`;
    });
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');

    return formatted;
  };

  return (
    <div className="h-full flex flex-col" style={{ background: 'rgba(14,14,20,0.98)' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(30,30,40,0.6), rgba(20,20,28,0.4))',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
            }}
          >
            ✦
          </div>
          <div>
            <h1
              className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              AI Chat
            </h1>
            <p className="text-[10px] text-zinc-500">
              Powered by Gemini 2.5 Flash
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-all"
          title="Clear chat"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                msg.role === 'user' ? 'rounded-br-md' : msg.role === 'assistant' ? 'rounded-bl-md' : ''
              }`}
              style={{
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))'
                  : msg.role === 'assistant'
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(245,158,11,0.06)',
                border: msg.role === 'user'
                  ? '1px solid rgba(99,102,241,0.2)'
                  : msg.role === 'assistant'
                    ? '1px solid rgba(255,255,255,0.05)'
                    : '1px solid rgba(245,158,11,0.12)',
              }}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[10px] font-medium text-violet-400">Gemini</span>
                </div>
              )}
              {msg.role === 'system' ? (
                <p className="text-xs text-amber-400/70 leading-relaxed">{msg.content}</p>
              ) : (
                <div
                  className="text-sm text-zinc-200 leading-relaxed break-words"
                  dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                />
              )}
              <p className="text-[9px] text-zinc-600 mt-1.5 text-right">
                {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div
              className="rounded-2xl rounded-bl-md px-4 py-3"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#818cf8' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </motion.div>
                <span className="text-xs text-zinc-500">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="shrink-0 px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,28,0.6), rgba(24,24,32,0.8))',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white placeholder-zinc-600 outline-none transition-all disabled:opacity-50"
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: input.trim() ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
