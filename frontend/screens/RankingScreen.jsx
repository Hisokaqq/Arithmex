import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';

const RankingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true)
  const [scores, setScores] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

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
    const fetchUserInfo = async () => {
      try {
        const value = await AsyncStorage.getItem('UserInfo')
        if (value !== null) {
          const user = await JSON.parse(value)
          const config = {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${user?.token}`,
            },
          }
          const { data } = await axios.get(
            'http://127.0.0.1:8000/api/users/refresh/',
            config
          )
          
          setUserInfo(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInfo()
  }, [])


  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
  
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
      
      
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      {!loading && (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

          <View style={styles.scores}>
            {scores.map((score, index) => (
              <View key={index} style={[styles.score, { borderColor: userInfo?.profile.full_username == score.full_username && "#0586e9"}]}>
                <View style={{flexDirection:"row", }}>
                    <Text style={{fontSize:17, fontWeight: "bold",  color: userInfo?.profile.full_username == score.full_username && "#0586e9"}}>{index+1}. </Text>
                    {userInfo?.profile.full_username == score.full_username
                    ?
                    <Text style={{fontSize:17, fontWeight: 600, color: "#0586e9"}}>Me: </Text>
                    :
                    <Text style={{fontSize:17,}}>{score.full_username}: </Text>
                    }
                    
                </View>
                <Text style={{fontSize:17, fontWeight: "bold",  color: userInfo?.profile.full_username == score.full_username && "#0586e9"}}>{score.score}</Text>
              </View>
            ))}
          </View>
          <StatusBar style="light" />

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
