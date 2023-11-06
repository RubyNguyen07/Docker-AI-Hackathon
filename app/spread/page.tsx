"use client";
import { useEffect, useState } from "react";

type Props = {};

interface Chat {
  role: "user" | "machine";
  message: string;
  options?: string[];
}

function TarotReading({}: Props) {
  const [conversation, setConversation] = useState<Chat[]>([
    {
      role: "machine",
      message: "What do you want to enquire about? For e.g.",
      options: [
        "How is love life in the next year?",
        "What are some advices for my career?",
        "What are some things I should look out for?",
      ],
    },
    {
      role: "user",
      message: "Lorem Ipsum Dolor",
    },
  ]);

  const [message, setMessage] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  const handleFetchResponse = async (message: string) => {
    setTimeout(() => {
      setConversation((conversation) => [
        ...conversation,
        {
          role: "machine",
          message: `Roger that! You said: ${message}`,
        },
      ]);
      setMessageLoading(false);
    }, 2000);
  };

  const handleSendMessage = async (e: any) => {
    if (!message) return;
    e.preventDefault();
    setMessageLoading(true);
    setConversation((conversation) => [
      ...conversation,
      {
        role: "user",
        message,
      },
    ]);
    handleFetchResponse(message);
    setMessage("");
  };

  useEffect(() => {
    const conversationEl = document.querySelector(".conversation");
    if (conversationEl) {
      conversationEl.scrollTo({
        top: conversationEl.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation.length]);

  return (
    <div className=" w-full">
      <h1>Hello</h1>
      <div className="conversation py-4 max-h-[500px] overflow-y-scroll">
        {conversation.map((item, index) => {
          return (
            <div
              key={index}
              className={`chat ${
                item.role === "machine" ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-bubble">
                {item.message}
                {item.role == "machine" && item.options?.length && (
                  <div className="flex flex-wrap gap-2 my-4">
                    {item.options?.map((option, i) => {
                      return (
                        <button
                          key={i}
                          className="btn btn-outline btn-xs normal-case"
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="h-24 sticky bottom-4 left-4 right-4 flex gap-2"
        onSubmit={handleSendMessage}
      >
        <textarea
          placeholder="Bio"
          className="textarea textarea-bordered resize-none w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary btn-square px-8"
          type="submit"
          disabled={messageLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default TarotReading;
