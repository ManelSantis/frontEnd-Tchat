import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar.tsx";
import { AuthProvider } from "../../context/AuthContext.tsx";


export default function MainPage() {

    return (
        <AuthProvider>
            <main className="w-full h-full flex fixed">
                <SideBar></SideBar>
                <Outlet />
            </main>
        </AuthProvider>
        
    )
}
