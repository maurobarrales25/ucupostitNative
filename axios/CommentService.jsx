import axios from "axios";

const ipAdress = "192.168.1.42";

export async function SaveComment(commentData) {
        console.log("Datos del comentario en la función save post:", commentData);
        const response = await axios.post(`http://${ipAdress}:8080/comment/save`, commentData);
        return response.data;
    }

export async function GetCommentsByPostId(postId) {
    try {
        console.log("postId en GetCommentsByPostId:", postId);    
        const response = await axios.get(`http://${ipAdress}:8080/comment/getCommentListByPostId/${postId}`);  
        return response.data;
    } catch (error) {       
        console.error("Error al obtener los comentarios:", error);
        throw error;
    }
}

export async function GetCommentsFromAuthor(authorId) {
    try {
        console.log("authorId en GetCommentsFromAuthor:", authorId);    
        const response = await axios.get(`http://${ipAdress}:8080/comment/findByAuth0Id/${authorId}`);
        return response.data;
    } catch (error) {       
        console.error("Error al obtener los comentarios:", error);
        throw error;
    }
}

