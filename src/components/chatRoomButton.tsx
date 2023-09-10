import { Link } from "react-router-dom";

type ChatRoomButtonProps = {
    id: string;
    groupName: string;
    usersNumber?: number;
}

export default function ChatRoomButton({groupName, usersNumber = 0, id}: ChatRoomButtonProps) {

    return (
        <>
        <Link to={`/mainpage/sala/${groupName}/${id}`}>
        <div className={`w-[340px] h-24 cursor-pointer rounded-[5px] ml-3 mt-2 hover:bg-[#4c4f77] flex items-center`}>
        <div className={`w-[40px] h-[40px] ml-4 bg-[#c1c5dd] rounded-full flex items-center justify-center`}>
            <span className={`font-bold text-3xl text-[#16144d]`}>GP</span>
            </div>
        <div>
            <strong className={`text-white pl-4 pt-2 text-3xl`}>{groupName}</strong><br />
            <span className={`text-white pl-4 pt-[2px] text-lg`}>Participantes {usersNumber}/50</span>
        </div>
        </div>
        </Link>
        </>
    )
}