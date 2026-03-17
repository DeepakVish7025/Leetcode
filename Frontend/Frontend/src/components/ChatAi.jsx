import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, User, Bot, Copy, Check } from 'lucide-react';
// If you want syntax highlighting, you would install react-syntax-highlighter
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ChatAi({ problem }) {
    const [messages, setMessages] = useState([
        {
            role: 'model',
            parts: [{ text: "Hi! I'm Herby 👋\n\nHi! I'm Herby, your AI assistant for solving DSA problems. Ask me anything about the current problem!" }]
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedStates, setCopiedStates] = useState({});

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to format code blocks and regular text
    const formatMessage = (text) => {
        if (!text) return text;

        const parts = text.split(/(```[\s\S]*?```)/g);

        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const code = part.slice(3, -3).trim();
                const firstLine = code.split('\n')[0];
                let language = '';
                let codeContent = code;

                // Try to extract language if it's explicitly stated on the first line
                const langMatch = firstLine.match(/^(\w+)/);
                if (langMatch && firstLine.includes(langMatch[1])) {
                    language = langMatch[1];
                    codeContent = code.substring(firstLine.length).trimStart();
                }

                return (
                    <div key={index} className="code-block bg-[#1f2937] rounded-lg shadow-md my-3 overflow-hidden">
                        {(language || codeContent) && ( // Only show header if there's content or language
                            <div className="code-header flex justify-between items-center bg-[#374151] px-4 py-2 text-gray-200">
                                <span className="text-sm font-mono opacity-80">{language || 'code'}</span>
                                <button
                                    className="copy-btn text-xs flex items-center gap-1 hover:text-white transition-colors duration-200"
                                    onClick={() => {
                                        navigator.clipboard.writeText(codeContent);
                                        setCopiedStates(prev => ({ ...prev, [index]: true }));
                                        setTimeout(() => setCopiedStates(prev => ({ ...prev, [index]: false })), 2000);
                                    }}
                                >
                                    {copiedStates[index] ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    {copiedStates[index] ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        )}
                        <pre className="p-4 overflow-x-auto text-sm text-gray-100 bg-[#1f2937]">
                            {/* If you add react-syntax-highlighter, replace `<code>{codeContent}</code>` with:
                            <SyntaxHighlighter language={language} style={oneDark} customStyle={{ backgroundColor: 'transparent', padding: 0 }}>
                                {codeContent}
                            </SyntaxHighlighter>
                            */}
                            <code>{codeContent}</code>
                        </pre>
                    </div>
                );
            }
            // For regular text, ensure paragraphs are correctly rendered
            return <p key={index} className="mb-2 last:mb-0">{part}</p>;
        });
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const newUserMessage = { role: 'user', parts: [{ text: data.message }] };
        setMessages(prev => [...prev, newUserMessage]);
        reset();

        try {
            const response = await axiosClient.post("/ai/chat", {
                messages: [...messages, newUserMessage], // Send all messages including the new one
                title: problem.title,
                description: problem.description,
                testCases: problem.visibleTestCases,
                startCode: problem.startCode
            });

            setMessages(prev => [...prev, {
                role: 'model',
                parts: [{ text: response.data.message }]
            }]);
        } catch (error) {
            console.error("API Error:", error);
            setMessages(prev => [...prev, {
                role: 'model',
                parts: [{ text: "Sorry, I encountered an error. Please try again later. (Error: " + (error.response?.data?.error || error.message) + ")" }]
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0d1117] text-[#e6edf3] rounded-lg shadow-2xl border border-[#2e343b] overflow-hidden"
             style={{
                 backgroundImage: 'radial-gradient(at 50% 0%, #1a2c3a 0%, transparent 70%)',
                 boxShadow: '0 0 40px rgba(0,255,160,0.1), 0 0 80px rgba(0,255,160,0.05)'
             }}>
            {/* Chat Header */}
            <div className="bg-[#161b22] px-6 py-4 border-b border-[#2e343b] rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <h3 className="font-mono text-base text-[#8b949e]">Chat 1</h3>
                <div className="w-[70px]"></div> {/* Spacer to balance header */}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex items-start max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`avatar ${msg.role === "user" ? "ml-3" : "mr-3"} flex-shrink-0`}>
                                <div className="bg-[#00c98d] text-[#0d1117] rounded-full w-9 h-9 flex items-center justify-center shadow-md">
                                    {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                                </div>
                            </div>
                            <div className={`chat-bubble ${msg.role === "user"
                                ? "bg-[#00c98d] text-[#0d1117] rounded-br-none"
                                : "bg-[#1f2937] text-[#e6edf3] rounded-bl-none"}
                                px-4 py-3 rounded-xl shadow-lg break-words whitespace-pre-wrap
                                transition-all duration-300 ease-in-out transform`}
                            >
                                <div className="message-content">
                                    {formatMessage(msg.parts[0].text)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-start max-w-[85%]">
                            <div className="avatar mr-3">
                                <div className="bg-[#00c98d] text-[#0d1117] rounded-full w-9 h-9 flex items-center justify-center">
                                    <Bot size={18} />
                                </div>
                            </div>
                            <div className="chat-bubble bg-[#1f2937] text-[#e6edf3] px-4 py-3 rounded-xl rounded-bl-none shadow-lg">
                                <div className="flex space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#8b949e] animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#8b949e] animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#8b949e] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="sticky bottom-0 p-4 bg-[#161b22] border-t border-[#2e343b] rounded-b-lg"
            >
                <div className="flex items-center gap-3">
                    <input
                        placeholder="Ask me anything..."
                        className="input input-ghost flex-1 input-md bg-[#0d1117] border border-[#2e343b] focus:border-[#00c98d] focus:ring-1 focus:ring-[#00c98d] text-[#e6edf3] placeholder-[#8b949e] transition-all duration-200 pl-4 pr-3 py-2 rounded-full font-mono text-sm"
                        {...register("message", { required: true, minLength: 2 })}
                        disabled={isLoading}
                        aria-label="Chat input"
                    />
                    <button
                        type="submit"
                        className="btn bg-[#00c98d] text-[#0d1117] btn-md rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-none"
                        disabled={errors.message || isLoading}
                        aria-label="Send message"
                    >
                        <Send size={18} />
                    </button>
                </div>
                {errors.message && (
                    <p role="alert" className="text-red-400 text-xs mt-2 ml-1">Please enter a message (at least 2 characters)</p>
                )}
            </form>
        </div>
    );
}

export default ChatAi;