"use client";
import { useEffect, useState } from "react";
import ChatDisplay, { Chat, Card, DrawChat } from "@/components/ChatDisplay";

type Props = {};

const FIRST_MESSAGE: Chat = {
  role: "machine",
  type: "text",
  message: "What do you want to enquire about?",
  options: [
    "How is my love life in the next year?",
    "What are some advices for my career?",
    "What are some things I should look out for?",
  ],
};

const getSecondMessage = (cards: Card[]) =>
  ({
    role: "machine",
    type: "draw",
    message: "Draw 3 cards",
    cards,
  } as DrawChat);

function TarotReading({}: Props) {
  const [conversation, setConversation] = useState<Chat[]>([FIRST_MESSAGE]);

  const [message, setMessage] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await fetch("/draw").then((res) => res.json());
      setCards(cards);
    };
    fetchCards();
  }, []);

  const handleDrawCards = async () => {
    const secondMessage = getSecondMessage(cards);
    console.log(cards);
    setConversation((conversation) => [...conversation, secondMessage]);
  };

  const handleFetchResponse = async (message: string) => {
    if (conversation.length <= 2) {
      handleDrawCards();
      return;
    }
    setTimeout(() => {
      setConversation((conversation) => [
        ...conversation,
        {
          role: "machine",
          type: "text",
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
        type: "text",
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
      <div className="flex items-center justify-center">
        <button className="btn btn-primary">Start Reading</button>
      </div>

      <ChatDisplay
        conversation={conversation}
        setMessage={setMessage}
        cards={cards}
      />

      <form
        className="h-24 sticky bottom-4 left-4 right-4 flex items-end gap-2"
        onSubmit={handleSendMessage}
      >
        <textarea
          placeholder="Your message"
          className="textarea textarea-bordered resize-none w-full h-full"
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
