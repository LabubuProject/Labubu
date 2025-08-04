const Card = ({
  index,
  value,
  letter,
  onClick,
  selectedCards,
  matchedCards,
}) => {
  // check if this card is selected or matched to determine conditional content and styling
  const isSelectedCard = selectedCards.find((card) => card.index === index);
  const isMatchedCard = matchedCards.find((card) => card.index === index);
  const flipped = isSelectedCard || isMatchedCard;

  return (
    <div
      //if card is selected, click listener is disabled
      className='card w-24 h-24 m-2'
      onClick={!flipped ? () => onClick(index, value) : null}
    >
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className='card-front rounded-lg shadow-lg flex items-center justify-center bg-gradient-to-br from-[#f7b2b7] to-[#D89B9E] text-ebony text-xl'></div>
        <div
          className={`card-back rounded-lg shadow-lg flex items-center justify-center bg-white text-3xl cardImage${letter}`}
        >
        </div>
      </div>
    </div>
  );
};

export default Card;
