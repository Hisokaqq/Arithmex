import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Level from '../components/Level'

const ProfileScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null)
  const [games, setGames] = useState([])
  
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
          const { data: data1 } = await axios.get(
            'http://127.0.0.1:8000/api/games/yours/',
            config
          )
          setUserInfo(data)
          setGames(data1)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInfo()
  }, [])

  const handleAvatarPress = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const data = new FormData();
          data.append('avatar', {
            uri: response.uri,
            type: response.type,
            name: response.fileName || response.uri.split('/').pop(),
          });

          const user = JSON.parse(await AsyncStorage.getItem('UserInfo'));
          const config = {
            headers: {
              'Content-type': 'multipart/form-data',
              Authorization: `Bearer ${user.token}`,
            },
          };

          try {
            const { data: updatedData } = await axios.put(
              'http://127.0.0.1:8000/api/users/update/',
              data,
              config
            );
            setUserInfo(updatedData);
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // clear all data from AsyncStorage
      navigation.navigate('Home'); // navigate to the Home screen
    } catch (e) {
      console.error('Error clearing user data:', e);
    }
  };
  

  return (
    <View style={{padding: 20, position: "relative", flex: 1}}>
      <View style={{flex:1}}>
      {userInfo && userInfo.profile && (
        <>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
        <TouchableOpacity onPress={handleAvatarPress} >
        <Image
          style={styles.avatar}
          source={{ uri: `http://127.0.0.1:8000${userInfo.profile.avatar }` }}
        />
        </TouchableOpacity>
          <Text style={styles.username}>{userInfo?.profile.full_username}</Text>
        </View>
          <View style={{backgroundColor: "#000", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
          <Text style={{color:"#fff", fontWeight:700}}>{userInfo.profile.score}</Text>
          </View>
        </View>
        <Level level={userInfo.profile.level} currentExp={userInfo.profile.experience}/>
        </>

      )}
      

      <View style={{ marginTop: 20, height: 300}}>
        <ScrollView style={{flex: 1}}>
          {games && games.map(game => (
            <View key={game.id} style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 10}}>
              <View>
              <Image
                style={[styles.avatar, {borderWidth:2, borderColor: game.winner!=game.player1 ? "#3fb528" : "#e51515"}]}
                source={{ uri: `http://127.0.0.1:8000${game.player2_avatar}` }}
              />
              </View>
              <Image source={require("../images/battle.png")}/>
              <View>
              <Image
                style={[styles.avatar, {borderWidth:2, borderColor: game.winner!=game.player2 ? "#3fb528" : "#e51515"}]}
                source={{ uri: `http://127.0.0.1:8000${game.player1_avatar}` }}
              />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      </View>
      <TouchableOpacity onPress={handleLogout} style={{alignSelf:"center", marginBottom: 30, backgroundColor: "black", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 5}}>
        <Text style={{color: "white", fontSize: 20, fontWeight: 700}}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  username: {
    fontWeight: 700, 
    fontSize: 20,
  }
})
