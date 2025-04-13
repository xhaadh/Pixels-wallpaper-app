import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen
            name="index"
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="home/index"
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="home/image"
            options={{
            headerShown: false,
            animation: "fade",
            presentation: "transparentModal"
            }}
        />
    </Stack>
  )
}

export default RootLayout