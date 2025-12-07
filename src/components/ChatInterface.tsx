import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Sparkles } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { fetchChatCompletion } from '../services/api';
import type { Message } from '../services/api';

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', content: 'You are a helpful, intelligent AI assistant.' },
        { role: 'assistant', content: 'Hello there! I am ready to help you. Ask me anything.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Call API
        const replyContent = await fetchChatCompletion([...messages, userMessage]);

        const botMessage: Message = { role: 'assistant', content: replyContent };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    return (
        <div className="gemini-container">
            {/* Minimal Header */}
            <header className="gemini-header">
                <div className="gemini-title">
                    <Menu size={20} />
                    <span>Chatbot</span>
                </div>
                <div className="p-2 rounded-full hover:bg-slate-800 cursor-pointer">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white  font-bold">
                        SA
                    </div>
                </div>
            </header>

            {/* Messages Scroll Area */}
            <div className="chat-scroll-area">
                {messages.filter(m => m.role !== 'system').map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}

                {isLoading && (
                    <div className="message-wrapper bot">
                        <div className="bot-avatar-container">
                            <Sparkles size={24} className="text-blue-300 animate-pulse" />
                        </div>
                        <div className="bot-text-area">
                            <span className="text-slate-400">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Floating Input Pill */}
            <div className="input-position-wrapper">
                <div className="input-pill">
                    <input
                        type="text"
                        className="gemini-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Enter a prompt here"
                        disabled={isLoading}
                        autoFocus
                    />
                    <button
                        className="send-btn-icon"
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
