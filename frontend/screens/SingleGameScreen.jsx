import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useLayoutEffect, useState, useEffect } from 'react'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const SingleGameScreen = ({navigation}) => {
    const operators = [" + ", " - ", " * "];
    // ×

    const [numOp, setNumOp] = useState(Math.floor(Math.random() * 3) + 2);
    const [numArray, setNumArray] = useState(Array.from({length: numOp}, () => Math.floor(Math.random() * 10) + 1));
    const [operatorArray, setOperatorArray] = useState(Array.from({ length: numOp - 1 }, () => {
        return operators[Math.floor(Math.random() * operators.length)];
    }));

    const [expression, setExpression] = useState(numArray.reduce((acc, curr, index) => acc + (index === 0 ? curr : operatorArray[index - 1] + curr), ""));
    const [result, setResult] = useState(eval(expression));
    const [answer, setAnswer] = useState('');

    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(100);
    const [score, setScore] = useState(0)

  
  useEffect(() => {
    if (timeLeft === 0) {
      setFinished(true);
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle: `${score}`, // Set the header title
      headerTitleAlign: "center", // Center align the header title
  
      headerTintColor: '#fff', // set the color of the back button
  
      headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 1)'
      },
      headerLeft: () => (
        <View style={{ marginLeft: 6 }}>
          <Ionicons
            name="arrow-back"   
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
      
      headerRight: () => (
        <Text style={{ marginRight: 6, color: '#fff', width: 35, display: "flex", textAlign:"right"}}>
          {timeLeft} 
        </Text>
      ),
    });
  }, [navigation, timeLeft, score]);
  
  const onButtonPress = (value) => {

    setAnswer(answer + value.toString());

    if (answer + value === result.toString()) {
        // Answer is correct, generate new random numbers and operators
        const newNumOp = Math.floor(Math.random() * 3) + 2;
        const newNumArray = Array.from({length: newNumOp}, () => Math.floor(Math.random() * 10) + 1);
        const newOperatorArray = Array.from({ length: newNumOp - 1 }, () => {
          return operators[Math.floor(Math.random() * operators.length)];
        });
    
        const newExpression = newNumArray.reduce((acc, curr, index) => acc + (index === 0 ? curr : newOperatorArray[index - 1] + curr), "");
        const newResult = eval(newExpression);
        setTimeout(() => {
            setNumOp(newNumOp);
            setNumArray(newNumArray);
            setOperatorArray(newOperatorArray);
            setExpression(newExpression);
            setResult(newResult);
            setAnswer('');
            setTimeLeft(timeLeft+5)
            setScore(score+1)
        }, 100); 
      }
  };

  const onDeletePress = () => {
    setAnswer(answer.slice(0, -1));
  };

  const onClearPress = () => {
    setAnswer('');
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1, alignItems:"center", marginTop: 10}}>
        <Text style={styles.questionText}>{expression} </Text>
        <Text style={styles.answerText}>{answer}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(1)}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(2)}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(3)}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(4)}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(5)}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(6)}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(7)}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(8)}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(9)}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onButtonPress('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onDeletePress()}>
          <Text style={styles.buttonText}>DEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  questionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
  },

  questionText: {
      fontSize: 20,
      fontWeight: 'bold',
  },   
  answerText:{
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',

  },
  buttonsContainer: {
      marginBottom: 80,
      width: 300,
      gap: 10,
    //   alignSelf: "center",
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
  },
  button: {
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 5,
      padding: 13,
      margin: 5,
      minWidth: 65,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText: {
      fontSize: 20,
  },
});

export default SingleGameScreen