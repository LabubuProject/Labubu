import { View, Text, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';

const Scoreboard = ({ visible, onClose }) => {
    const scoreboardData = [
        { idx: 1, name: 'Laura', bestTime: '28s', highestLevel: 43 },
        { idx: 2, name: 'Yuan', bestTime: '1m 20s', highestLevel: 40 },
        { idx: 3, name: 'Aman', bestTime: '2m', highestLevel: 38 }
    ];

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>⭐️ Scoreboard ⭐️</Text>
                            <ScrollView style={styles.scrollView}>
                                {scoreboardData.map((user) => (
                                    <View 
                                        key={user.idx} 
                                        style={styles.userItem}
                                    >
                                        <Text style={styles.userName}>#{user.idx} {user.name}</Text>
                                        <Text style={styles.userText}>
                                            Best Time: {user.bestTime || 'N/A'}, 
                                            Highest Level: {user.highestLevel ?? 'N/A'}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default Scoreboard

// ... keep your existing styles ...

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '90%',
        maxWidth: 500,
        maxHeight: '80%',
        borderWidth: 2,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    scrollView: {
        width: '100%',
    },
    userItem: {
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: '#f8f9fa'
    },
    userName: {
        fontWeight: 'bold', 
        fontSize: 16,
        marginBottom: 4
    },
    userText: {
        color: '#374151',
        fontSize: 14
    },
});