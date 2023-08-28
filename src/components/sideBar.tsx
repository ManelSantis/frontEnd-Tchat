import { useState } from 'react';

export default function SideBar() {
    const [expanded, setExpanded] = useState(true);

    return (
        <div id="menu" className={`h-full bg-[#3F4259] flex flex-col justify-center items-center drop-shadow-[0 35px 35px rgb(0, 0, 0, 0.50)] ${expanded ? "w-[420px]" : "w-[50px]"}`}>
            <button className="text-white absolute top-0 left-2" onClick={() => setExpanded(curr => !curr)}>
                <svg className={`${expanded ? "w-[40px] h-[40px]" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <svg className={`${expanded ? "hidden" : "w-[40px] h-[40px]"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </button>
            <div className={` h-[150px] ${expanded ? "" : "invisible"}`}>
                <h1 className={`text-7xl font-semibold text-white mb-16 pt-0`}> TChat </h1>
            </div>
            <button className={`flex flex-col justify-center items-center w-full h-[50px] text-white bg-[#3F4259] border-t-2 hover:bg-[#676C90]`}> <span className={`${expanded ? "" : "hidden"}`}>Minha Conta</span>
                <svg className={`${expanded ? "hidden" : "w-[40px] h-[40px]"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </button>
            <button className={`flex flex-col justify-center items-center w-full h-[50px] text-white bg-[#3F4259] border-t-2 hover:bg-[#676C90]`}> <span className={`${expanded ? "" : "hidden"}`}>Salas</span>
                <svg className={`${expanded ? "hidden" : "w-[40px] h-[40px]"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            </button>
            <button className={`flex flex-col justify-center items-center w-full h-[50px] text-white bg-[#3F4259] border-t-2 hover:bg-[#676C90]`}> <span className={`${expanded ? "" : "hidden"}`}>Criação de Sala</span>
                <svg className={`${expanded ? "hidden" : "w-[40px] h-[40px]"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            <button className={`flex flex-col justify-center items-center w-full h-[50px] text-white bg-[#3F4259] border-t-2 hover:bg-[#676C90]`}> <span className={`${expanded ? "" : "hidden"}`}>Contatos</span>
                <svg className={`${expanded ? "hidden" : "w-[40px] h-[40px]"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            </button>
            <button className={`flex flex-col justify-center items-center w-full h-[50px] text-white bg-[#3F4259] border-t-2 border-b-2 hover:bg-[#676C90]`}> <span className={`${expanded ? "" : "hidden"}`}>Sair</span>
                <svg className={`${expanded ? "hidden" : "w-[40px] h-[40px]"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )

}