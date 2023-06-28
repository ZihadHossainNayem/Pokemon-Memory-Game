import React from "react";

const Card = ({ card, handleSelectedCard, flipped, stopFlip }) => {
  const handleClick = () => {
    if (!stopFlip) {
      handleSelectedCard(card);
    }
  };
  return (
    <div className="relative">
      {/* card block */}
      <div className={flipped ? "flipped" : ""}>
        {/* card front image */}
        <div className="md:w-[180px] md:h-[240px] w-[170px] h-[227px] bg-white flex items-center rounded overflow-hidden  border border-white front-img">
          <img src={card.src} alt="cardImage" className="" />
        </div>
        {/* card back cover */}
        <img
          onClick={handleClick}
          className="md:w-[180px] md:h-[240px] w-[170px] h-[227px] rounded border border-white  back-img "
          src="/assets/cardback.png"
          alt="cardBack"
        />
      </div>
    </div>
  );
};

export default Card;
