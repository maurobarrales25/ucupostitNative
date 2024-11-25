import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import LikeButton from "../../components/LikeButton";
import { GetPostById } from "../../axios/PostService";
import { GetCommentsByPostId } from "../../axios/CommentService";
import CommentList from "../../components/CommentList";
import { SavePostLike, IsLikedByCurrentUser } from "../../axios/LikeService";
import { SaveComment } from "../../axios/CommentService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function PostDetail() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [comentario, setComentario] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { postId } = useLocalSearchParams();

    const fetchData = useCallback(async () => {
        if (!postId) {
            setError("ID del post no proporcionado");
            setLoading(false);
            return;
        }

        try {
            const [postResponse, commentsResponse] = await Promise.all([
                GetPostById(postId),
                GetCommentsByPostId(postId)
            ]);
            setPost(postResponse);
            setComments(commentsResponse);

            const likeDataDTO = {
                auth0id: "google-oauth2116624442099130403644",
                postId: postId,
            };
            const isLikedResponse = await IsLikedByCurrentUser(likeDataDTO);
            setIsLiked(isLikedResponse);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
            setError("No se pudo cargar el post. Por favor, intente de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const handleLike = async () => {
        const likeDataDTO = {
            auth0id: "google-oauth2116624442099130403644",
            postId: postId,
        };

        setIsLiked((prevIsLiked) => !prevIsLiked);
        await SavePostLike(likeDataDTO);
        fetchData(); 
    };

    const handleComment = async () => {
        if (!comentario.trim()) return;

        const commentData = {
            auth0id: "google-oauth2116624442099130403644",
            postId: postId,
            content: comentario,
        };

        try {
            await SaveComment(commentData);
            setComentario("");
            fetchData(); // Refresh comments after posting
        } catch (error) {
            console.error("Error al guardar el comentario:", error);
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Link href="/" style={styles.link}>
                    Volver al inicio
                </Link>
            </View>
        );
    }

    if (!post) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No se encontró el post</Text>
                <Link href="/" style={styles.link}>
                    Volver al inicio
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {post.imageURL && (
                <Image
                    source={{ uri: post.imageURL }}
                    style={styles.image}
                    accessibilityLabel={`Imagen de ${post.title}`}
                />
            )}

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.content}>{post.content}</Text>

                <View style={styles.authorContainer}>
                    <Image
                        source={{ uri: post.user?.imageUrl }}
                        style={styles.authorImage}
                    />
                    <View>
                        <Text style={styles.authorName}>{post.user?.name}</Text>
                        {post.postDate && (
                            <Text style={styles.dateText}>
                                {new Date(post.postDate).toLocaleDateString()}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <LikeButton isLiked={isLiked} handleLike={handleLike} />
                    <Text style={styles.likesCount}>
                        {post.likesCount || 0} likes
                    </Text>
                </View>

                <View >
                    <TextInput
                        placeholder="Escribe un comentario"
                        placeholderTextColor="white"
                        value={comentario}
                        onChangeText={(text) => setComentario(text)}
                        style={{
                            color: "#fff",
                            backgroundColor: "#414040",
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: "blue",
                            width: '100%',
                            height: 60,
                            marginLeft: 4,
                            marginRight: 4,
                            marginBottom: 12,
                            fontSize: 16,
                            padding: 5
                        }}>
                    </TextInput>

                    <TouchableOpacity
                        onPress={handleComment}
                        style={styles.send}
                        activeOpacity={0.7}
                        >
                        if
                        <Text style={{ color: "white" }} >Enviar Comentario</Text>
                    </TouchableOpacity>
                </View>




                {comments.length > 0 && (
                    <View style={styles.commentsContainer}>
                        <Text style={styles.commentsTitle}>Comentarios</Text>
                        <CommentList comments={comments} />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backroundDark: {
        BackgroundColor: "#1a1a1a",
    },
    container: {
        flex: 1,
        backgroundColor: "#1a1a1a",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#1a1a1a",
    },
    header: {
        backgroundColor: "#1a1a1a",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#9ca3af",
        marginTop: 4,
    },
    contentContainer: {
        padding: 16,
    },
    backLink: {
        fontSize: 16,
        color: "#3b82f6",
        padding: 16,
        paddingBottom: 8,
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: "#d1d5db",
        marginBottom: 16,
    },
    authorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    authorName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff",
    },
    dateText: {
        fontSize: 14,
        color: "#9ca3af",
        marginTop: 4,
    },
    link: {
        color: "#3b82f6",
        fontSize: 16,
        fontWeight: "500",
        marginTop: 16,
    },
    errorText: {
        color: "#ef4444",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
    },
    actionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    likesCount: {
        marginLeft: 8,
        fontSize: 14,
        color: "#9ca3af",
    },
    commentsContainer: {
        marginTop: 24,
    },
    commentsTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    send: {
        backgroundColor: '#007AFF', 
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
});

