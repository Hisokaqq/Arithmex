import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Level = ({ currentExp, level }) => {
  const nextLevelExp  = (level) => {

    return Math.floor((level ** 2) * 100) 
  };
  const have = Math.abs(currentExp - nextLevelExp(level-1))
  const next = Math.abs(nextLevelExp(level-1) - nextLevelExp(level))
  const progress = 1 - Math.abs(next-have)/next
  return (
    <View style={styles.container}>
    <View style={styles.barContainer}>
      <View style={[styles.bar, { width: `${progress * 100}%`}]} />
    </View>
    <View style={{marginTop: 10}}> 
        <Text style={{color: '#32bc08', fontSize: 20, fontWeight: 700}}>{have}/{next}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30, 
    alignItems: "center",
  },
  barContainer: {
    backgroundColor: '#ccc',
    height: 10,
    borderRadius: 5,
    width: "100%",
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#32bc08',
  },
});

export default Level;
