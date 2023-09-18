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

export type listRoomData = {
    token: string;
    body: roomData[];
}

export type roomData = {
    id: string;
    title: string;
    description: string;
    participants: string[];
};

export const createRoom = ({ token, body }: createRoomData) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    }
    return api.post("/api/rooms", body, { headers });
}

export const listRooms = ( token : string) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };

    return api.get("/api/rooms", {headers});
}

export const getMessages = ({ token, roomId}: { token: string, roomId: string}) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };

    return api.get(`/api/messages`, {headers, params: {roomId}});
};

export const sendMessage = ({ token, body }: { token: string, body: { room: string, content: string }}) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };

    return api.post(`/api/messages`, body, {headers});
};