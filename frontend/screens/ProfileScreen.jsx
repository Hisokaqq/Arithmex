import { StyleSheet, Text, View, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const value = await (AsyncStorage.getItem('UserInfo'))
            
            if (value !== null) {
              const user = await JSON.parse(value)
              const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                }
              }
              const { data } = await axios.get(
                "http://127.0.0.1:8000/api/users/refresh/",
                config
              );
              setUserInfo(data);
              console.log(userInfo)
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserInfo();
      }, []);
  return (
    <View>
      <View>
        <Image url="http://127.0.0.1:8000/media/avatars/def_avatar.png"/>
        <Text>{userInfo?.profile.full_username}</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})