"use client";
import React from "react";

export interface Chat {
  role: "user" | "machine";
  type: "text" | "draw";
  message: string;
  options?: string[];
}

export interface DrawChat extends Chat {
  type: "draw";
  cards: Card[];
}

export interface Card {
  name: string;
  image: string;
}

type Props = {
  conversation: Chat[];
  setMessage?: (message: string) => void;
  cards?: Card[];
};

function ChatDisplay({ conversation, setMessage, cards }: Props) {
  return (
    <div className="conversation py-4 overflow-y-scroll">
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
              {item.role == "machine" && item.options?.length && setMessage && (
                <div className="flex flex-wrap gap-2 my-4">
                  {item.options?.map((option, i) => {
                    return (
                      <button
                        key={i}
                        className="btn btn-outline btn-xs normal-case"
                        onClick={() => {
                          setMessage(option);
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                  {cards && cards.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-4">
                      {cards?.map((card, i) => {
                        return (
                          <div key={i} className="flex flex-col items-center">
                            {/* <img
                              src={card.image}
                              alt={card.name}
                              className="w-32 h-48"
                            /> */}
                            <span className="text-sm">{card.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatDisplay;
