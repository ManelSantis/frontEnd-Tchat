import { useForm } from "react-hook-form";
import { z } from "zod";
import criacaoImg from "../../assets/criacao.svg";
import SideBar from "../../components/sideBar.tsx";
import AddUserChat from "../../components/addUserChat.tsx";

const createRoomFormSchema = z.object({
    name: z.string().min(10),
    description: z.string()
    //Users?
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export default function CriacaoSala() {
    const { register, handleSubmit } = useForm<CreateRoomFormData>();

    const onSubmit = (data: CreateRoomFormData) => {
        console.log(data);
    }

    return (

        <main className="w-full h-full flex">
            <SideBar></SideBar>
            <div className="w-full lg:w-[600px] h-full bg-[#9499CC] flex flex-col justify-center items-center px-24">
                <h1 className="text-7xl font-semibold text-white mb-16">Criacão de Sala</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div>
                        <label htmlFor="name" className="text-white font-semibold">Nome</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="text" id="name" {...register("name")} />
                    </div>
                    <div>
                        <label htmlFor="description" className="text-white font-semibold">Descrição</label>
                        <input className="w-full outline-none px-3 h-[80px] rounded" type="text" id="description" {...register("description")} />
                    </div>
                    <div>
                        <label htmlFor="search" className="text-white font-semibold">Participantes</label><br />
                       <AddUserChat></AddUserChat>
                    </div>
                    

                    <button
                        type="submit"
                        className="w-full outline-none h-16 rounded flex justify-center items-center bg-[#6C7099] text-white font-semibold mt-6 hover:bg-[#4f5270] transition">
                        Criar Sala
                    </button>
                </form>
            </div>
            <div className="md:flex flex-1 flex-col bg-[#9499CC] justify-center p-20 sm:hidden">
                <img src={criacaoImg} alt="Cadastro image" className="lg:max-w-3xl self-end lg:mt-9 md:max-w-xl md:mt-24 md:mr-24" />
            </div>
            <script src="criacao.js"></script>
        </main>
    )
}
