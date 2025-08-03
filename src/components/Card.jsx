import React from 'react';

const Card = ({ index, value, onClick, selectedCards, matchedCards }) => {
  const isSelectedCard = selectedCards.find((card) => card.index === index);
  const isMatchedCard = matchedCards.find((card) => card.index === index);

  // check if this card is selected or matched to determine conditional content and styling
  const btnContent = isSelectedCard || isMatchedCard ? value : '?';
  const btnStyle = isMatchedCard ? 'bg-[#8AA749]' : 'bg-[#F7B2B7]';

  return (
    <button
      //if card is matched, button is disabled
      disabled={isMatchedCard}
      //if card is selected, click listener is disabled
      onClick={isSelectedCard ? null : () => onClick(index, value)}
      className={`m-2 text-center rounded-lg px-6 py-8 shadow-xl ring-1 dark:bg-black ${btnStyle}`}
    >
      {btnContent}
    </button>
  );
};

export default Card;
