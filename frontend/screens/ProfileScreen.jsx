import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Level from '../components/Level'
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null)
  const [games, setGames] = useState([])
  const [avatarUri, setAvatarUri] = useState(null);

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
  
  const handleAvatarPress = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    // Launch the image picker and wait for the user to select an image
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      // If an image was selected, update the component state with the URI of the selected image
      setAvatarUri(pickerResult.assets[0].uri);
  
      // Create a new FormData object and append the selected image to it
      const data = new FormData();
      data.append("avatar", {
        name: "avatar.jpg",
        type: "image/jpg",
        uri: pickerResult.assets[0].uri
      });
  
      // Create a configuration object with the necessary headers
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
  
      try {
        // Send a PUT request to the server with the FormData object and the configuration object
        const response = await axios.put('http://127.0.0.1:8000/api/users/update/', data, config);
        // Update the user info with the data returned from the server
        setUserInfo(response.data);
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  

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
        {/* <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            style={styles.avatar}
            source={{ uri: `http://127.0.0.1:8000${userInfo.profile.avatar }` }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            style={styles.avatar}
            source={{ uri: avatarUri ? avatarUri : `http://127.0.0.1:8000${userInfo.profile.avatar }` }}
          />
        </TouchableOpacity>
          <Text style={styles.username}>{userInfo?.profile.full_username}</Text>
        </View>
          <View style={{backgroundColor: "#000", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
          <Text style={{color:"#fff", fontWeight:700}}>lvl. {userInfo.profile.level}</Text>
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
