import { Client } from "@stomp/stompjs";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageReceive from "../../components/messageReceive.tsx";
import MessageSend from "../../components/messageSend.tsx";
import { AuthContext, AuthContextType } from "../../context/AuthContext.tsx";

export default function Sala() {
    const { user } = useContext(AuthContext) as AuthContextType;
    const [stompClient, setStompClient] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    const { groupName, groupId } = useParams();
    const headers = { Email: user.user_name };

    useEffect(() => {
        const stompConfig = {
            connectHeaders: {Email: user.user_name },
            brokerURL: "ws://localhost:8080/api/websocket",
            debug: function (str: any) {
                console.log('STOMP: ' + str);
            },
            // If disconnected, it will retry after 200ms
            reconnectDelay: 200,
            // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
            onConnect: () => {
                stompClient.subscribe('ws://localhost:8080/topic/public', onMessageReceived);
                setStompClient(stompClient);
            },
        };
        const stompClient = new Client(stompConfig);
        stompClient.activate();}
    , []);

    function onMessageReceived(payload: any) {
        const message = JSON.parse(payload.body);
        setMessages([...messages, message.content]);
    }

    function send() {
        const messageContent = message;
    
        if (messageContent && stompClient) {
            const chatMessage = {
                content: messageContent,
            };
    
            stompClient.send(`ws://localhost:8080/app/chat/${groupId}/send`, headers, JSON.stringify(chatMessage));
            setMessage("");
        }
    }

    return (
            <div className="w-full block">
                <div className="w-full h-[75px] bg-[#575b7a] flex justify-center items-center border-l-2 border-l-[#9d9aa0]">
                    <span className="text-white text-4xl">{groupName}</span>
                </div>
                <div id="chatRoom" className="w-full h-[80%] bg-[#9499CC] overflow-y-auto flex-col items-end">
                        {messages.map((text, index) => (
                            <MessageSend key={index} text={text} />
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
