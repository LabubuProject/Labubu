import '../index.css';

const Card = ({ index, value, onClick, selectedCards, matchedCards }) => {
  const isSelectedCard = selectedCards.find((card) => card.index === index);
  const isMatchedCard = matchedCards.find((card) => card.index === index);
  const flipped = isSelectedCard || isMatchedCard;

  // check if this card is selected or matched to determine conditional content and styling
  // const btnContent = isSelectedCard || isMatchedCard ? value : '?';
  // const btnStyle = isMatchedCard ? 'bg-[#FFFFFF]' : 'bg-[#F7B2B7]';

  return (
    // <button
    //   //if card is matched, button is disabled
    //   disabled={isMatchedCard}
    //   //if card is selected, click listener is disabled
    //   onClick={isSelectedCard ? null : () => onClick(index, value)}
    //   className={`m-2 text-center rounded-lg bg-gradient-to-br from-[#f7b2b7] to-[#D89B9E]  hover:bg-[#dd906f] px-6 py-8 shadow-lg hover:shadow-xl dark:bg-black ${btnStyle}`}
    // >
    //   {btnContent}
    // </button>
    <div
      className='card w-24 h-32 m-2'
      onClick={!flipped ? () => onClick(index, value) : undefined}
    >
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className='card-front rounded-lg shadow-lg flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300 text-xl'>
          ?
        </div>
        <div className='card-back rounded-lg shadow-lg flex items-center justify-center bg-white text-3xl'>
          {value}
        </div>
      </div>
    </div>
  );
};

export default Card;
