import { useState} from 'react';

export default function AddUserChat() {
    var [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddUser = () => {
        if (inputValue.trim() !== "") {
            setUsers((oldArray) => [...oldArray, inputValue]);
            setInputValue('');
        }
    };

    function showUsers() {

    }

    return (
        <>
            <div className="flex">
                <input value={inputValue}
                    onChange={handleInputChange}
                    className="w-[86%] outline-none px-3 h-14 rounded" type="text" id="search" />
                <label id="add" 
                className="w-[14%] outline-none h-14 flex rounded justify-center items-center bg-[#3F4259] 
                cursor-pointer text-white font-semibold ml-2 hover:bg-[#2E303C]"
                onClick={handleAddUser}>
                    +
                </label>
            </div>
            <div className="font-semibold text-xl text-[#363636]">
                {users.length > 0 ? users.join(', ')  : 'Nenhum participante adicionado'}
            </div>
        </>
    )
}