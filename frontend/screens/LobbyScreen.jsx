import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const LobbyScreen = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/searching/')
    console.log(ws)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'users') {
        setUsers(data.payload)
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <View>
      <Text>LobbyScreen</Text>
      <Text>List of users:</Text>
      {users.map((user) => (
        <Text key={user.id}>{user.username}</Text>
      ))}
    </View>
  )
}

export default LobbyScreen

const styles = StyleSheet.create({})
