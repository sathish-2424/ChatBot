import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, User } from 'lucide-react';
import type { Message } from '../services/api';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`message-wrapper ${isUser ? 'user' : 'bot'}`}
        >
            {!isUser && (
                <div className="bot-avatar-container">
                    {/* Gemini uses a sparkle/star icon */}
                    <Sparkles size={24} className="text-blue-300" strokeWidth={1.5} />
                </div>
            )}

            <div className={isUser ? 'user-bubble' : 'bot-text-area'}>
                {isUser ? (
                    <div>{message.content}</div>
                ) : (
                    <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
