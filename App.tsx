import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Modal from "./Components/modal"
export default function App() {
  const number = 123
  return (
    <View style={styles.container}>
      <Modal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(142 , 215 , 250)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
