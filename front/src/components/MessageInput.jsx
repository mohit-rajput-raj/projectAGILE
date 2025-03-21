import { useState } from "react";
import { useMessagesStore } from "../Store/messagesStore";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendMessage, sendMessageLoading, error } = useMessagesStore();
    
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await sendMessage({ text: text.trim() });
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting || sendMessageLoading}
        />
        <button 
          type="submit" 
          className={`button btn-circle ${(isSubmitting || sendMessageLoading) ? 'opacity-50' : ''}`} 
          disabled={!text.trim() || isSubmitting || sendMessageLoading}
        >
          <Send size={22} />
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MessageInput;
