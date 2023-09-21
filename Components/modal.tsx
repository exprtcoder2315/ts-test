import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import app from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";

const App = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCorrectPopup, setShowCorrectPopup] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectMessage, setShowCorrectMessage] = useState<boolean>(false);
  const [data1, setData1] = useState<object[]>([]);
  const [data2, setData2] = useState<object[]>([]);
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    const db = getDatabase(app);
    const english = ref(db, 'english');
    const german = ref(db, 'german');
    console.log("receiving Data");
    onValue(english, (snapshot) => {
      let english = snapshot.val();
      setData1(english)
      console.log('Testing');
      console.log(english);
    })
    onValue(german, (snapshot) => {
      let german = snapshot.val();
      setData2(german)
      console.log('Testing');
      console.log(german);
    })

  }, [])

  const handleContinue = () => {
    if (selectedAnswer === "hause") {
      setShowCorrectMessage(true);
    } else {
      setShowCorrectMessage(false);
    }
    setShowModal(!showModal);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <View>
              <Text style={styles.maintitle}>Fill in the missing word</Text>
            </View>
            <View>
            {data1.map((item :object, index) => (
                <Text style={styles.heading1} key={index}>
                  {item.word1} <Text style={styles.heading2}>{item.word2} </Text>
                  <Text>{item.word3} </Text>
                  <Text>
                    {item.word4}
                  </Text>
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.question}>
                <Text style={styles.word1}>Das </Text>
                <Text style={styles.word2}>{selectedAnswer || "______"}</Text>
                <Text style={styles.word3}> ist </Text>
                <Text style={styles.word4}>Klein</Text>
              </Text>
            </View>
            {showCorrectMessage && (
              <View>
                <Text style={styles.correctMessage}>Correct!</Text>
              </View>
            )}
            <View style={styles.choose1}>
              <View style={styles.choose2}>
                {choose.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.choose}
                      key={index}
                      onPress={() => handleSelectAnswer(item.name)}
                    >
                      <Text style={styles.choosebutton}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <Text style={styles.buttonText}>Click To Open Modal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  modal: {
    height: screenHeight * 0.8,
    backgroundColor: "rgb(71 ,108 ,127)",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: -160,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingBottom: 40,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  button: {
    backgroundColor: "rgb(109 , 145 ,164)",
    padding: 22,
    borderRadius: 50,
    alignItems: "center",
    width: screenHeight * 0.4,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
  maintitle: {
    marginTop: 70,
    color: "white",
    fontSize: 14,
  },
  heading1: {
    fontSize: 25,
    color: "white",
  },
  heading2: {
    textDecorationLine: "underline",
    fontWeight: "900",
    fontSize: 26,
  },
  question: {
    fontSize: 24,
    color: "white",
    textDecorationStyle: "dotted",
  },
  choose: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 25,
    elevation: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  choosebutton: {
    fontSize: 16,
    fontWeight: "bold",
  },
  choose1: {
    display: "flex",
    width: screenHeight * 0.4,
  },
  choose2: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  word1: {
    color: "white",
  },
  word2: {
    elevation: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    margin: 5,
    fontWeight: "bold",
    color: "rgb(109 , 145 ,164)",
  },
  word3: {
    color: "white",
  },
  word4: {
    color: "white",
  },
  correctMessage: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const choose = [
  {
    id: "1",
    name: "folgen",
  },
  {
    id: "2",
    name: "schaf",
  },
  {
    id: "3",
    name: "bereiden",
  },
  {
    id: "4",
    name: "hause",
  },
];

export default App;
