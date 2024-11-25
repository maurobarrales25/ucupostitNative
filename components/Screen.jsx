import React from 'react';
import { View } from 'react-native';

export default function Screen({ children }) {
    return (
        <View className="flex-1 bg-[#1a1a1a] mt-4 mb-4">
            {children}
        </View>
    )
}

