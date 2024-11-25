import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PostCard from './PostCard';
import Screen from './Screen';

const PostList2 = ({ posts = [] }) => {
    const renderPost = ({ item }) => (
        <PostCard post={item} />
    );

    const renderEmptyList = () => (
        <Text style={styles.emptyText}>No hay posts</Text>
    );

    return (
        <Screen>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.postId}
                ListEmptyComponent={renderEmptyList}
                contentContainerStyle={styles.listContent}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});

export default PostList2;

