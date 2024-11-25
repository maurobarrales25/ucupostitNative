import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMyUser } from '../../axios/UserService';
import { getPostsByAuth0Id } from '../../axios/PostService';
import { GetCommentsFromAuthor } from '../../axios/CommentService';
import PostList2 from '../../components/PostList2';
import CommentList from '../../components/CommentList';


export default function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showPost, setShowPost] = useState(true);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => { 
    const fetchUserData = async () => {
        try {
            const userData = await getMyUser();
            setUser(userData);

            console.log("User toto:", userData?.name);
            const postsResponse = await getPostsByAuth0Id(userData.auth0id);
            setPosts(postsResponse);

            const commentsResponse = await GetCommentsFromAuthor(userData.auth0id);
            setComments(commentsResponse);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    fetchUserData();
}, []);


const handleShowPost = () => {
    setShowPost(true);
    setShowComments(false);
};

const handleShowComment = () => {
    setShowPost(false);
    setShowComments(true);
};


if (isLoading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
    );
}

return (
    <View style={styles.container}>
        <View style={styles.profileHeader}>
            <Image
                source={{ uri: user?.imageUrl }}
                style={styles.profileImage}
            />
            <Text style={styles.userName}>{user?.name}</Text>

        </View>

        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tabButton, showPost && styles.activeTab]}
                onPress={handleShowPost}
            >
                <Text style={styles.tabButtonText}>Publicaciones</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tabButton, showComments && styles.activeTab]}
                onPress={handleShowComment}
            >
                <Text style={styles.tabButtonText}>Comentarios</Text>
            </TouchableOpacity>
        </View>

        {showPost && <PostList2 posts={posts} />}
        {showComments && <CommentList comments={comments} />}

    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        color: '#ffffff',
        marginTop: 10,
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#333333',
    },
    activeTab: {
        backgroundColor: '#0066cc',
    },
    tabButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});


