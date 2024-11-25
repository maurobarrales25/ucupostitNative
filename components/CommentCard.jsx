import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
const CommentCard = ({ comment }) => {

    const handleProfilePress = () => {
        console.log(`Navigate to profile: ${comment.user.auth0id}`);
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <Text style={styles.content}>{comment.content}</Text>
                <View style={styles.authorSection}>
                    <Image
                        source={{ uri: comment.user.imageUrl }}
                        style={styles.authorImage}
                        accessibilityLabel="Imagen de perfil del autor"
                    />
                    <View>
                        <Text style={styles.authorLabel}>Comentado por:</Text>
                        <Link href={`../app/Profile/${comment.user.auth0id}`} asChild>
                        <TouchableOpacity onPress={handleProfilePress}>
                            <Text style={styles.authorName}>{comment.user.name}</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#414040',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'blue',
        marginBottom: 10,
        overflow: 'hidden',
    },
    cardBody: {
        padding: 1,
    },
    content: {
        color: 'white',
        fontSize: 15,
        marginBottom: 10,
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 20,
        height: 20,
        resizeMode: "cover",
        borderRadius: 10,
        marginRight: 15,
    },
    authorLabel: {
        color: 'white',
        fontSize: 12,
    },
    authorName: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default CommentCard;

