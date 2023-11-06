"use client";
import { useState } from "react";

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

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setConversation([
      ...conversation,
      {
        role: "user",
        message,
      },
    ]);
    setMessage("");
  };

  return (
    <div className=" w-full">
      <h1>Hello</h1>
      <div>
        {/* <div className="chat chat-start">
          <div className="chat-bubble">
            What do you want to enquire about? For e.g.
            <div className="flex flex-wrap gap-2 my-4">
              <button className="btn btn-outline btn-xs normal-case">
                How is love life in the next year?
              </button>
              <button className="btn btn-outline btn-xs normal-case">
                What are some advices for my career?
              </button>
              <button className="btn btn-outline btn-xs normal-case">
                What are some things I should look out for?
              </button>
            </div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">Lorem Ipsum Dolor</div>
        </div> */}
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
        className="h-24 absolute bottom-4 left-4 right-4 flex gap-2"
        onSubmit={handleSendMessage}
      >
        <textarea
          placeholder="Bio"
          className="textarea textarea-bordered resize-none w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="btn btn-primary btn-square px-8" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default TarotReading;
