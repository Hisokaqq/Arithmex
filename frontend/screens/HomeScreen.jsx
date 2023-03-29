import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const value = await AsyncStorage.getItem('UserInfo');
        setUserInfo(value)
        console.log(userInfo)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, [navigation]);
  
  const navigationHandler = async () => {
    if(userInfo)  navigation.navigate(  "Profile" )
    else navigation.navigate(  "Sign In" )
  }
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigationHandler}>
          <MaterialCommunityIcons
            name="account"
            size={24}
            color="#000"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={()=>navigation.navigate("Rankings")}>
          <MaterialCommunityIcons
            name="trophy"
            size={24}
            color="#000"
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#fff', 
      },
      headerTitle: '', // remove the title
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
        <View style={styles.btncont}>
            <TouchableOpacity onPress={()=>navigation.navigate("SingleGame")} style={styles.select}>
                <Text style={{textAlign: "center"}} >SinglePlyerMode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.select}>
                <Text style={{textAlign: "center"}}>MultyPlayerMode</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btncont: {
    display:"flex",
    width: "100%",
    alignItems: 'center',
    gap: 15,
  },

  select: {
    borderWidth: 3,
    paddingVertical: 10,
    width: 200,
    borderRadius: 5,
  },

});

export default HomeScreen;
