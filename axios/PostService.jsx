import axios from "axios";

const ipAdress = "192.168.1.42";

export async function CreatePostService(postData) {
    console.log("Datos del post en la funcion create post:", postData);
    const response = await axios.post(`http://${ipAdress}:8080/post/save/post`, postData);
    return response.data;
}

export async function GetAllPosts() {
    try {
        const response = await axios.get(`http://${ipAdress}:8080/post/findAll`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        throw error; 
    }
}

export async function GetPostById(postId) {
    try {
        const response = await axios.get(`http://${ipAdress}:8080/post/getPostById/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el post:", error);
        throw error;
    }
}

export async function GetPostByCategorty(category) {
    try {
        const response = await axios.get(`http://${ipAdress}:8080/post/getPostByCategory/${category}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el post:", error);
        throw error;
    }
}

export async function getPostsByAuth0Id(auth0Id) {
    try {
        const response = await axios.get(`http://${ipAdress}:8080/post/getPostsByAuth0Id/${auth0Id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el post:", error);
        throw error;
    }
}

export async function IsLikedByCurrentUser(likedata) {
    console.log("Datos del post en isLikedByCurrentUser:", likedata);
    const response = await axios.get(`http://${ipAdress}:8080/like/isLikedByCurrentUser`, {params: likedata});
    return response.data;
}


