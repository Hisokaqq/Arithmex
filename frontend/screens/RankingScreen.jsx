import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

const RankingScreen = () => {
  const [loading, setLoading] = useState(true)
  const [scores, setScores] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://127.0.0.1:8000/api/users/scoring/')
      setScores(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      {!loading && (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.scores}>
            {scores.map((score, index) => (
              <View key={index} style={styles.score}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:17, fontWeight: "bold"}}>{index+1}. </Text>
                    <Text style={{fontSize:17}}>{score.full_username}: </Text>
                </View>
                <Text style={{fontSize:17, fontWeight: "bold"}}>{score.score}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default RankingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scores: {
    paddingHorizontal:30,
    marginTop: 10,
  },
  score: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingTop: 5,
  }
})
