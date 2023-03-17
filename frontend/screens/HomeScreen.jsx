import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="account"
            size={24}
            color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="trophy"
            size={24}
            color="white"
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 1)', 
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
