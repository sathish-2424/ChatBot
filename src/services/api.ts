
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
// Fallback in case env var isn't loaded (though it should be)
const OR_API_KEY = API_KEY || "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";

export const fetchChatCompletion = async (messages: Message[]) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OR_API_KEY}`,
                "HTTP-Referer": window.location.origin, // Site URL
                "X-Title": "Beautiful Chatbot", // Site title
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "tngtech/deepseek-r1t2-chimera:free",
                "messages": messages
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        return data.choices?.[0]?.message?.content || "No response received.";
    } catch (error) {
        console.error("Chat Error:", error);
        return "Sorry, I encountered an error while trying to respond.";
    }
};
