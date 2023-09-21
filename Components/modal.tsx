// Import React and Component
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import app from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";

//---------- components ---------
const App = () => {
  //---------- state, redux state, veriable and hooks
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<object[]>([]);
  const [answers, setAnswers] = useState<object[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);


  //---------- life cycles section
  useEffect(() => {
    const db = getDatabase(app);
    const questionsRef = ref(db, 'questions');
    const answersRef = ref(db, 'answers');
    console.log("receiving Data");
    onValue(questionsRef, (snapshot) => {
      let questionsData = snapshot.val();
      setQuestions(questionsData);
      console.log('Received questions data:');
      console.log(questionsData);
    });
    onValue(answersRef, (snapshot) => {
      let answersData = snapshot.val();
      setAnswers(answersData);
      console.log('Received answers data:');
      console.log(answersData);
    });
  }, []);


  //---------- helpers : other and users action
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };
  const handleContinue = () => {
    const currentAnswer :any= answers[currentQuestionIndex];

    if (selectedAnswer === currentAnswer.correctAnswer) {
      // Show a "Correct" alert for a correct answer
      Alert.alert("Correct", "Your answer is correct!", [
        { text: "OK", onPress: () => {} },
      ]);

      // Load the next question
      const nextAnswerId = currentAnswer.nextQuestionId;
      if (nextAnswerId !== null) {
        const nextAnswerIndex :any =  answers.findIndex((answer:any) => answer.id === nextAnswerId);
        setCurrentQuestionIndex(nextAnswerIndex);
      }
      setSelectedAnswer(null);
    } else {
      // Show a "Wrong Answer" alert for a wrong answer
      Alert.alert("Wrong Answer", "Your answer is incorrect. Please try again.", [
        { text: "OK", onPress: () => {} },
      ]);
      setSelectedAnswer(null); // Clear the selected answer
    }
    if (currentQuestionIndex >= questions.length - 1) {
      // Check if it's the last question
      setShowModal(false); // Close the modal when the quiz is completed
      setCurrentQuestionIndex(0); // Reset the question index for the next quiz
      // Show an alert when all questions have been successfully answered
      Alert.alert("Congratulations", "You have completed all questions!", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  //---------- main view

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
              {questions.length > 0 && currentQuestionIndex < questions.length && (
                <Text style={styles.heading1}>
                  {questions[currentQuestionIndex].word1}{" "}
                  <Text style={styles.heading2}>
                    {questions[currentQuestionIndex].word2}{" "}
                  </Text>
                  {questions[currentQuestionIndex].word3}{" "}
                  {questions[currentQuestionIndex].word4}
                </Text>
              )}
            </View>
            <View>
              {answers.length > 0 && currentQuestionIndex < answers.length && (
                <Text style={styles.heading1}>
                  {answers[currentQuestionIndex].word1}{" "}
                  <Text style={styles.word2}>{selectedAnswer || "______"}</Text>
                  <Text> {answers[currentQuestionIndex].word3}{" "}</Text>
                  {answers[currentQuestionIndex].word4}
                </Text>
              )}
            </View>
            <View style={styles.choose1}>
              <View style={styles.choose2}>
                {answers.map((item :any, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.choose}
                      key={index}
                      onPress={() => handleSelectAnswer(item.correctAnswer)}
                    >
                      <Text style={styles.choosebutton}>{item.correctAnswer}</Text>
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


export default App;
