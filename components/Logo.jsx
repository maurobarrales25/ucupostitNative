import React from 'react';
import { Image, View } from 'react-native';

const Logo = () => {
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
            />
        </View>
    );
};

export default Logo;