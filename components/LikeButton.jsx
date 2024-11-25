import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LikeButton = ({ isLiked, handleLike }) => {
    return (
        <TouchableOpacity onPress={handleLike} style={styles.container}>
            <FontAwesome
                name="heart"
                size={24}
                color={isLiked ? "#ff4136" : "#808080"}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default LikeButton;
