import Timer from './Timer';
import { View, StyleSheet, Text } from 'react-native';

const Stats = ({ flips, gameWon, paused }) => {
  return (
    <View style={styles.container}>
      <Timer gameStarted={flips > 0} gameWon={gameWon} paused={paused} />
      <Text>{`Number of Flips: ${flips}`}</Text>
      {gameWon && <Text >{`You Win User!`}</Text>}
    </View>
  );
};

export default Stats;


const styles = StyleSheet.create({
    container: {
        fontSize: 20,       
        fontWeight: '600',   
        backgroundColor: '#bbce8f',  
        borderRadius: 8,      
        padding: 8,          
        marginBottom: 4,       
        color: 'black',         
        overflow: 'hidden',
    },
    textTransform: {
        textTransform: 'uppercase'
    }

})