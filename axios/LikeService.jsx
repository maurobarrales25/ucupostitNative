import axios from "axios";

const ipAdress = "192.168.1.42";

export async function SavePostLike(LikeData) {
    console.log("Datos del Like para mandar:", LikeData);
    const response = await axios.post(`http://${ipAdress}:8080/like/savePostLike`, LikeData);
    return response.data;
}

export async function SaveCommentLike(LikeData) {
    console.log("Datos del Like para mandar:", LikeData);
    const response = await axios.post(`http://${ipAdress}:8080/like/saveCommentLike`, LikeData);
    return response.data;
}

export async function GetLikesByAuth0Id(auth0Id) {
    console.log("Datos del usuario con getLikesByAuth0Id:", auth0Id);
    const response = await axios.get(`http://${ipAdress}:8080/like/getLikesByAuth0id/${auth0Id}`);
    return response.data;
}

export async function GetCountLikesByPostId(postId) {
    console.log("Datos del post en countLikesPost:", postId);
    const response = await axios.get(`http://${ipAdress}:8080/like/countLikesPost/${postId}`);
    return response.data;
}

export async function IsLikedByCurrentUser(likedata) {
    console.log("Datos del post en isLikedByCurrentUser:", likedata);
    const response = await axios.get(`http://${ipAdress}:8080/like/isLikedByCurrentUser`, {params: likedata});
    return response.data;
}

