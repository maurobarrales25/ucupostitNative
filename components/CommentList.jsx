import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CommentCard from './CommentCard'; // Assuming you have this component

const CommentList = ({ comments = [] }) => {
    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <CommentCard comment={item} />
        </View>
    );

    const renderEmptyList = () => (
        <Text style={styles.emptyText}>No hay comentarios en este post</Text>
    );


    return (
        <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.commentId}
            ListEmptyComponent={renderEmptyList}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flexGrow: 1,
        width: '100%',
        paddingHorizontal: 10,
    },
    commentContainer: {
        width: '100%',
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});

export default CommentList;

