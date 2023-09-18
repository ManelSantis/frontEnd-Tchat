import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import MessageReceive from "../../components/messageReceive.tsx";
import MessageSend from "../../components/messageSend.tsx";
import { AuthContext, AuthContextType } from "../../context/AuthContext.tsx";
import { getMessages, sendMessage } from "../../services/roomService.ts";

export default function Sala() {
    const { access_token, userId } = useContext(AuthContext) as AuthContextType;
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    const { groupName, groupId } = useParams();

    useEffect(() => {
        getMessages({ token: access_token, roomId: groupId}).then((response) => {
            setMessages(response.data.content);
        });

        subscribe();
        
    }, [groupId]);

    const subscribe = () => {
        const ws = new SockJS('http://localhost:15672')

        const headers = {
            'login': 'guest',
            'passcode': 'guest',
            'durable': 'true',
            'auto-delete': 'false'
        }
        const stompClient = Stomp.over(ws)

        stompClient.connect(headers , function(frame){
            console.log('Connected')
            const subscription = stompClient.subscribe(`/queue/${userId}`, function(message){
                console.log(message)
            })
        })
    }

    const send = async () => {
        await sendMessage({ token: access_token, body: { content: message, room: groupId }})
        setMessage("");
    };
    return (
            <div className="w-full block">
                <div className="w-full h-[75px] bg-[#575b7a] flex justify-center items-center border-l-2 border-l-[#9d9aa0]">
                    <span className="text-white text-4xl">{groupName}</span>
                </div>
                <div id="chatRoom" className="w-full h-[80%] bg-[#9499CC] overflow-y-auto flex-col items-end">
                        {messages.map((message, index) => (
                            message.creator.id === userId ? (<MessageSend key={index} text={message.content} />) :
                            (<MessageReceive key={index} text={message.content} />)
                        ))}
                </div>
                <div className="w-full h-[75px] bg-[#575b7a] flex justify-left items-center border-l-2 border-l-[#9d9aa0]">
                    <input className="w-[90%] ml-8 outline-none px-3 h-14 rounded" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={send} className="w-[90px] ml-4 mr-4 outline-none h-14 rounded flex justify-center items-center bg-[#6C7099] text-white font-semibold  hover:bg-[#4f5270]">
                        Enviar
                    </button>
                </div>
            </div>
    )
}
