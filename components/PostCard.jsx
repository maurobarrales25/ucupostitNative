import { GetPostById } from '../axios/PostService';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity} from "react-native";


const PostCard = ({ post }) => {
    const { title, content, imageURL, category, user } = post;
    const author = user.name;

    const router = useRouter();

    const handleReadMore = () => {
        router.push(`/PostID/${post.postId}`);
    };

    console.log(post.postId);

    return (
        <Link href={`/PostID/${post.postId}`} asChild>
            <TouchableOpacity className='active:opacity-70 border border-gray-700
            active:border-white/50 mb-2'>
                <View style={styles.card}>
                    {post.imageURL && (
                        <Image
                            source={{ uri: post.imageURL }}
                            style={styles.image}
                            accessibilityLabel={`Imagen de ${post.title}`}
                        />
                    )}
                    <View style={styles.cardBody}>
                        <Text style={styles.category}>Comunidad: {post.category}</Text>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.content}>
                            {post.content.length > 150
                                ? `${post.content.substring(0, 150)}...`
                                : post.content}
                        </Text>

                        <View style={styles.authorSection}>
                            
                            <Text style={styles.authorText}>Posteado por: {author}</Text>
                            <Image
                                source={{ uri: user?.imageUrl }}
                                style={styles.authorImage}
                                accessibilityLabel="Imagen de perfil del autor"
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleReadMore}>
                            <Text style={styles.buttonText}>Leer más ...</Text>
                        </TouchableOpacity>
                        <View style={styles.commentsSection}>
                            <Text style={styles.commentsText}>💬 Comentarios</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
    },
    cardBody: {
        padding: 16,
    },
    category: {
        color: '#9ca3af',
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff', 
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#d1d5db', 
        marginBottom: 12,
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    authorText: {
        fontSize: 14,
        color: '#9ca3af', 
    },
    authorImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#3b82f6', 
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    commentsSection: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentsText: {
        fontSize: 14,
        color: '#9ca3af', 
    },
});

export default PostCard;

