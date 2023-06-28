import React, { useEffect, useState } from "react";
import Card from "./Card";

const images = [
  { src: "/assets/meowth.jpg", paired: false },
  { src: "/assets/pikachu.jpg", paired: false },
  { src: "/assets/gardevoir.jpg", paired: false },
  { src: "/assets/celebi.jpg", paired: false },
  { src: "/assets/crobart.jpg", paired: false },
  { src: "/assets/jolteon.jpg", paired: false },
];

const images2 = [
  { src: "/assets/meowth.jpg", paired: false },
  { src: "/assets/pikachu.jpg", paired: false },
  { src: "/assets/gardevoir.jpg", paired: false },
  { src: "/assets/celebi.jpg", paired: false },
  { src: "/assets/crobart.jpg", paired: false },
  { src: "/assets/jolteon.jpg", paired: false },
  { src: "/assets/metagross.jpg", paired: false },
  { src: "/assets/rayquaza.jpg", paired: false },
  { src: "/assets/vaporeon.jpg", paired: false },
];

const images3 = [
  { src: "/assets/meowth.jpg", paired: false },
  { src: "/assets/pikachu.jpg", paired: false },
  { src: "/assets/gardevoir.jpg", paired: false },
  { src: "/assets/celebi.jpg", paired: false },
  { src: "/assets/crobart.jpg", paired: false },
  { src: "/assets/jolteon.jpg", paired: false },
  { src: "/assets/metagross.jpg", paired: false },
  { src: "/assets/rayquaza.jpg", paired: false },
  { src: "/assets/vaporeon.jpg", paired: false },
  { src: "/assets/lapras.jpg", paired: false },
  { src: "/assets/cinderace.jpg", paired: false },
  { src: "/assets/sylveon.jpg", paired: false },
];

const Game = () => {
  /* state to store card for particular game */
  const [cards, setCards] = useState([]);

  /* state for card flips */
  const [flip, setFlip] = useState(0);

  /* state for 1st and 2nd selected card */
  const [selectOne, setSelectOne] = useState(null);
  const [selectTwo, setSelectTwo] = useState(null);

  /* state to stop continuously flipping  */
  const [stopFlip, setStopFlip] = useState(false);

  /* state for selected level */
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const handleSelectedLevel = (level) => {
    setSelectedLevel(level);
    gameLevel(level);
  };

  const gameLevel = (level) => {
    setSelectOne(null);
    setSelectTwo(null);
    setFlip(0);
    setStopFlip(false);
    cardShuffle(level);
  };

  /*function for card shuffling, duplicating and generating id for each card */
  const cardShuffle = (level) => {
    let selectedImg = [];
    if (level === "easy") {
      selectedImg = [...images];
    } else if (level === "medium") {
      selectedImg = [...images2];
    } else if (level === "hard") {
      selectedImg = [...images3];
    }

    /* duplicate each image */
    const cardShuffled = [...selectedImg, ...selectedImg]
      /* shuffling */
      .sort(() => Math.random() - 0.5)
      /* generating id for each card */
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(cardShuffled);
  };

  /* handling selected card */
  const handleSelectedCard = (card) => {
    if (!stopFlip && (selectOne !== card || selectTwo !== card)) {
      selectOne ? setSelectTwo(card) : setSelectOne(card);
    }
  };

  /* comparison of two selected card */
  useEffect(() => {
    if (selectOne && selectTwo) {
      setStopFlip(true);
      /* if we have a match, return a new array,*/
      /* and change the paired value to true for the 2 matched card  */
      if (selectOne.src === selectTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === selectOne.src) {
              return { ...card, paired: true };
            } else {
              return card;
            }
          });
        });
        resetFlip();
      } else {
        setTimeout(() => resetFlip(), 1000);
      }
    }
  }, [selectOne, selectTwo]);

  /* reset selection , increment flip */
  const resetFlip = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setFlip((prevFlip) => prevFlip + 1);
    setStopFlip(false);
  };

  /* show the game screen from the beginning, so you don't have to click start for the first game */
  useEffect(() => {
    cardShuffle("easy");
  }, []);

  return (
    <div>
      <div className="max-w-[1580px] mx-auto mt-6">
        {/* text + button*/}
        <div className="text-white">
          <div className="flex justify-center">
            <h1 className="inline-block md:text-3xl text-2xl font-semibold tracking tracking-wide">
              Pokemon Memory Game
            </h1>
          </div>

          {/* mode button */}
          <div className="flex justify-center items-center mt-4 font-medium gap-4">
            <button
              onClick={() => handleSelectedLevel("easy")}
              className={`md:text-base text-sm border border-white py-1 rounded-xl md:w-32 w-24 hover:bg-white hover:text-[#1f1f1f] ${
                selectedLevel === "easy" ? "bg-white text-black" : ""
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => handleSelectedLevel("medium")}
              className={`md:text-base text-sm  border border-white py-1 rounded-xl md:w-32 w-24 hover:bg-white hover:text-[#1f1f1f] ${
                selectedLevel === "medium" ? "bg-white text-black" : ""
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleSelectedLevel("hard")}
              className={`md:text-base text-sm border border-white py-1 rounded-xl md:w-32 w-24 hover:bg-white hover:text-[#1f1f1f] ${
                selectedLevel === "hard" ? "bg-white text-black" : ""
              }`}
            >
              Hard
            </button>
          </div>
        </div>

        {/* game showcase grid*/}
        <div className="flex items-center justify-center">
          <div
            className={`mt-6 grid gap-4 py-2 px-2 ${
              selectedLevel === "medium"
                ? "lg:grid-cols-6 md:grid-cols-4 grid-cols-2"
                : selectedLevel === "hard"
                ? "lg:grid-cols-8 md:grid-cols-4 grid-cols-2"
                : "md:grid-cols-4 grid-cols-2"
            }`}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleSelectedCard={handleSelectedCard}
                flipped={
                  card === selectOne || card === selectTwo || card.paired
                }
                stopFlip={stopFlip}
              />
            ))}
          </div>
        </div>
        {/* results section */}
        <div className="flex items-center">
          <p className="text-white text-2xl font-medium inline-block mx-auto py-2 px-4 rounded-lg">
            Pair Flips: {flip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
