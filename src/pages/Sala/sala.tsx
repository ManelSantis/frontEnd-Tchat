import SideBar from "../../components/sideBar.tsx";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MessageSend from "../../components/messageSend.tsx";

export default function Sala() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const { groupName } = useParams()

    const send = () => {
        setMessages([...messages, message])
        setMessage('') // limpar
    }

    return (
        <main className="w-full h-full flex fixed">
            <SideBar></SideBar>
            <div className="w-full block">
                <div className="w-full h-[75px] bg-[#575b7a] flex justify-center items-center border-l-2 border-l-[#9d9aa0]">
                    <span className="text-white text-4xl">{groupName} </span>
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
        </main>
    )
}
