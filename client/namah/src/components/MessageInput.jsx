import { useState } from "react";
import { Button } from '@headlessui/react'


const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        onSend(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full flex justify-between p-2 gap-1">
            <input
                type="text"
                value={text}
                placeholder=" Type a message..."
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-2xl bg-[#e5eade] p-2 outline-none"
                />

            {/* <button type="submit"
                className="rounded px-4 py-2 bg-sky-600 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500"
            >Send</button> */}
            <Button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-gray-500 px-4 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                Send
            </Button>
        </div>
        </form>
    );
};

export default MessageInput;
