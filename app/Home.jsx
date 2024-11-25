import  { useEffect, useState, useCallback } from "react";   
import { Text, View, SafeAreaView, StatusBar, RefreshControl, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import PostList2 from "../components/PostList2";
import Screen from "../components/Screen";
import { GetAllPosts } from "../axios/PostService";


export default function HomePage() {const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const posts = await GetAllPosts();
            setPostList(posts);
        } catch (err) {
            setError('No se pudieron cargar los posts. Por favor, intenta de nuevo.');
            console.error('Error fetching posts:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [fetchPosts])
    );

    const onRefresh = useCallback(() => {
        fetchPosts();
    }, [fetchPosts]);




    return (
        <Screen>
            <StatusBar barStyle="light-content" />
            <SafeAreaView className="flex-1">
                <View className="flex-1 p-4">
                    <Text className="text-white text-2xl font-bold mb-4">Home Page</Text>
                    <PostList2 posts={postList} />
                </View>
            </SafeAreaView>
        </Screen>
    );
}
