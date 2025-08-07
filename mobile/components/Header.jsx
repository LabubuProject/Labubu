import { View, Text, StyleSheet } from 'react-native'
import Stats from './Stats';
const Header = ({ flips, gameWon, gameStarted, paused }) => {
    
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Labu Who?</Text>
      {gameStarted && <Stats flips={flips} gameWon={gameWon} paused={paused} />}
    </View>
  )
}
export default Header

const styles = StyleSheet.create({
    container: {
    display: 'flex',     
    flexDirection: 'column', 
    alignItems: 'center',   
    justifyContent: 'center', 
    marginTop: 40,         
  },
  headerText: {
    fontSize: 36,
    fontWeight: '600', 
    marginBottom: 32,
    color: 'white', 
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 0, height: 4 }, 
    textShadowRadius: 8,
  },
});