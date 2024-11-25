import axios from "axios";

const ipAdress = "192.168.1.42"

export async function CreateOrLoadUser(userData) {
    console.log("Datos del usuario en la funcion create or load:", userData);
    const response = await axios.post(`http://${ipAdress}:8080/user/createUser`, userData);
    return response.data;
}

export async function GetUserByAuth0Id(auth0Id) {
    console.log("Datos del usuario con getByAuth0Id:", auth0Id);
    const response = await axios.get(`http://${ipAdress}:8080/user/getUserByAuth0Id/${auth0Id}`);
    return response.data;
}

export async function getFollowersByAuth0Id(auth0Id) {
    console.log("Datos del usuario con getByAuth0Id:", auth0Id);
    const response = await axios.get(`http://${ipAdress}:8080/user/getFollowersByAuth0Id/${auth0Id}`);
    return response.data;
}

export async function isFollowing(usersData){
    console.log("Datos que mando al DTO:", usersData);
    const response = await axios.get(`http://${ipAdress}:8080/user/isFollowing/`, usersData);
    return response.data;
}

export async function toggleFollow(usersData){
    console.log("Datos que mando al DTO:", usersData);
    const response = await axios.post(`http://${ipAdress}:8080/user/toggleFollow`, usersData);
    return response.data;
}

export async function getMyUser() {
    const response = await axios.get(`http://${ipAdress}:8080/user/nativeUser`);
    return response.data;
    
}
