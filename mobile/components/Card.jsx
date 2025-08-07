import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

const Card = ({ index, value, letter, onClick, selectedCards, matchedCards }) => {
  const isSelected = selectedCards.some(card => card.index === index);
  const isMatched = matchedCards.includes(value);
  const flipped = isSelected || isMatched;

  const imageSources = {
    'A': require('../assets/labubuA.png'),
    'B': require('../assets/labubuB.png'),
    'C': require('../assets/labubuC.png'),
    'D': require('../assets/labubuD.png'),
    'E': require('../assets/labubuE.png'),
    'F': require('../assets/labubuF.png'),
    'G': require('../assets/labubuG.png'),
    'H': require('../assets/labubuH.png'),
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={!flipped ? () => onClick(index, value) : null}
      activeOpacity={0.7}
      disabled={flipped}
    >
      <View style={[
        styles.cardSide, 
        styles.cardBack,
        { opacity: flipped ? 0 : 1 }
      ]} />
      
      <View style={[
        styles.cardSide,
        styles.cardFront,
        { opacity: flipped ? 1 : 0 }
      ]}>
        <Image 
          source={imageSources[letter]} 
          style={styles.cardImage}
          resizeMode="contain"
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 96,
    height: 96,
    margin: 8,
  },
  cardSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#f7b2b7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '80%',
    height: '80%',
  },
});

export default Card;