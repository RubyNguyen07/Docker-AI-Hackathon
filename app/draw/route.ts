import tarots from "../tarot.json";
import { NextResponse } from "next/server";

const cards = tarots.cards;
const cardsLength = cards.length;

export async function GET() {
  // get 3 random numbers
  const randomNumbers = [0, 0, 0].map(() =>
    Math.floor(Math.random() * cardsLength)
  );
  return NextResponse.json({
    cards: randomNumbers.map((number) => cards[number]),
  });
}
