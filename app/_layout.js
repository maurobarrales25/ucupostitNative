import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HomeIcon } from '../components/Icons';;
import Logo from '../components/Logo';

export default function Layout() {
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <StatusBar style="light" />
            <Stack screenOptions={{
                headerTitle: '',
                headerStyle: { backgroundColor: 'darkblue' },
                headerTintColor: 'white',
                
            }}>
                <Stack.Screen
                    name="Home"
                    options={{
                        headerShown: true,
                        headerTitle: "Home",
                        backgroundColor: "#1a1a1a",
                    }}
                />
                <Stack.Screen
                    name="[postId]"
                    options={{
                        headerTitle: "Post Details",
                        headerBackTitle: "Back",
                        backgroundColor: "#1a1a1a",
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name= "(tabs)"
                    options={{
                        headerShown: false,
                    }}
                    />
            </Stack>

        </View>

    );
}

