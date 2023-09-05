import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080"
});

export type createRoomData = {
    token: string;
    body: {
        title: string;
        description: string;
        participants: string[];
    }
}

export const createRoom = ({token, body}: createRoomData) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    }
    return api.post("/api/rooms", body, { headers });
}