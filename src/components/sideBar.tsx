import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import ChatRoomButton from "./chatRoomButton";
import { roomData, listRooms } from "../services/roomService.ts";

export default function SideBar() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [rooms, setRooms] = useState<roomData[]>([]);

    const { access_token, user } = useContext(AuthContext) as AuthContextType;

    //Fazer um for com todos os nomes das salas, IDs, e numero de participantes
    useEffect(() => {
        // Função para buscar e definir a lista de salas
        async function fetchRooms() {
          try {
            const response = await listRooms( access_token ); // Passe o token e o corpo apropriados
            setRooms(response.data.content); // Assumindo que os dados da sala são retornados no formato de array
          } catch (error) {
            console.error('Erro ao buscar a lista de salas:', error);
          }
        }
    
        fetchRooms(); // Chama a função ao montar o componente
      }, []);      

    const [filterChatRooms, setFilterChatRooms] = useState(rooms);

    const searchInChatRooms = () => {
        if (searchValue.trim() === '') {
            setFilterChatRooms(rooms);
        } else {
            const filteredRooms = rooms.filter(room =>
                room.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilterChatRooms(filteredRooms);
        }
    };

    return (
        <div id="menu" className={`w-[480px] h-full bg-[#3F4259] flex-col justify-center items-center drop-shadow-[0 35px 35px rgb(0, 0, 0, 0.50)]`}>
            <div className={`w-full h-[150px] bg-[#575b7a] flex flex-col items-center`}>
                <div className={`w-[40px] h-[40px] ml-4 mt-8 bg-[#c1c5dd] rounded-full flex items-center justify-center`}>
                    <span className={`font-bold text-3xl text-[#16144d]`}>FS</span>
                </div>
                <strong className={`text-white pl-4 pt-4 text-3xl`}>Fulano Sicrano da Silva</strong>
                <span className={`text-white pl-4 pt-0 pb-2 text-lg`}>{user.user_name}</span>
                <div className={``}>
                    <button className={`w-[100px] bg-[#6C63FF] text-[#FFFFFF] mr-2 rounded-[5px] hover:bg-[#3f3a91] hover:text-[#6C63FF]`}>Perfil</button>
                    <button className={`w-[100px] bg-[#FFFFFF] text-[#6C63FF] rounded-[5px] hover:bg-[#888888] hover:text-[#FFFFFF]`}
                        onClick={() => {
                            localStorage.removeItem('authData');
                            navigate('/')
                        }}
                    >Sair</button>
                </div>
            </div>
            <div className={``}>
                <div className={`w-full h-20`}>
                    <input className="w-[225px] outline-none mt-4 ml-4 pl-4 h-12 rounded" placeholder="Pesquisar..."
                        type="text" id="search" value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            searchInChatRooms();
                        }} />
                    <Link to={'/mainpage/criacaoSala'}><button className={`w-[100px] bg-[#6C7099] mt-4 h-12 ml-4 rounded-[5px] text-white hover:bg-[#5c5f8d]`}>Criar Sala</button></Link>
                </div>
                <div id="chatRooms" className={`w-[355px] h-[530px] overflow-y-auto pb-7 `}>
                    {filterChatRooms.map((room,index) => (
                        <ChatRoomButton key={index} groupName={room.title} id={room.id} />
                    ))}
                </div>
            </div>
        </div>
    )

}