import ChatRoomButton from "./chatRoomButton"
import { Link } from "react-router-dom";


export default function SideBar() {

    return (
        <div id="menu" className={`w-[480px] h-full bg-[#3F4259] flex-col justify-center items-center drop-shadow-[0 35px 35px rgb(0, 0, 0, 0.50)]`}>
            <div className={`w-full h-[150px] bg-[#575b7a] flex flex-col items-center`}> 
                <div className={`w-[40px] h-[40px] ml-4 mt-8 bg-[#c1c5dd] rounded-full flex items-center justify-center`}>
                    <span className={`font-bold text-3xl text-[#16144d]`}>FS</span>
                </div>
                <strong className={`text-white pl-4 pt-4 text-3xl`}>Fulano Sicrano da Silva</strong>
                <span className={`text-white pl-4 pt-0 pb-2 text-lg`}>email@email.com.br</span>
                <div className={``}>
                    <button className={`w-[100px] bg-[#6C63FF] text-[#FFFFFF] mr-2 rounded-[5px] hover:bg-[#3f3a91] hover:text-[#6C63FF]`}>Perfil</button>
                    <Link to="/">
                    <button className={`w-[100px] bg-[#FFFFFF] text-[#6C63FF] rounded-[5px] hover:bg-[#888888] hover:text-[#FFFFFF]`}>Sair</button>
                    </Link>
                </div>
            </div>
            <div className={``}>
                <div className={`w-full h-20`}>
                    <input className="w-[225px] outline-none mt-4 ml-4 pl-4 h-12 rounded" placeholder="Pesquisar..." type="text" id="search"/>
                    <Link to={'/criacaoSala'}><button className={`w-[100px] bg-[#6C7099] mt-4 h-12 ml-4 rounded-[5px] text-white hover:bg-[#5c5f8d]`}>Criar Sala</button></Link>
                </div>
                <div id="chatRooms" className={``}>
                        <ChatRoomButton groupName="Anime"/>
                        <ChatRoomButton groupName="Jogos"/>
                        <ChatRoomButton groupName="Informática"/>
                        <ChatRoomButton groupName="Conhecer novas pessoas"/>
                        <ChatRoomButton groupName="Fãs da Taylor Swift"/>

                </div>
            </div>
        </div>
    )

}