import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import criacaoImg from "../../assets/criacao.svg";
import SnackbarCustom from "../../components/SnackbarCustom.tsx";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { createRoom, createRoomData } from "../../services/roomService.ts";

const createRoomFormSchema = z.object({
    title: z.string().nonempty("O nome é obrigatório"),
    description: z.string().nonempty("A descrição é obrigatória"),
    participants: z.array(z.object({
        id: z.string().nonempty("O id é obrigatório")
    }))
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export default function CriacaoSala() {
    const  { access_token } = useContext(AuthContext) as AuthContextType;
    const { register, handleSubmit, formState: { errors}, control, setValue } = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomFormSchema)
    });

    const [suceess, setSuccess] = useState(false);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'participants',
    });

    function addNewParticipant() {
        append({ id: '' });
    }

    function removeParticipant(index: number) {
        remove(index)
    }

    const onSubmit = (data: CreateRoomFormData) => {
        const arr = data.participants.map((participant) => participant.id);
        const roomData: createRoomData = {
            token: access_token,
            body:{
                title: data.title,
                description: data.description,
                participants: arr
            }
        }
        createRoom(roomData).then((response) => {
            console.log(response);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setValue("title", "");
            setValue("description", "");
            setValue("participants", []);
        });
    }

    return (
        <main className="w-full h-full flex">
            <div className="w-full lg:w-[600px] h-full bg-[#9499CC] flex flex-col justify-center items-center px-24">
                <h1 className="text-7xl font-semibold text-white mb-16">Criação de Sala</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div>
                        <label htmlFor="title" className="text-white font-semibold">Título</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="text" id="name" {...register("title")} />
                        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="description" className="text-white font-semibold">Descrição</label>
                        <input className="w-full outline-none px-3 h-[80px] rounded" type="text" id="description" {...register("description")} />
                        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                    </div>
                    <div>
                        <button className="w-full outline-none h-14 rounded flex justify-center items-center bg-[#6C7099] text-white font-semibold mt-6 hover:bg-[#4f5270] transition" onClick={addNewParticipant}>Adicionar Participante</button>
                        <div className="flex flex-col mt-4">
                            {fields.map((field, index) => (
                                <div className="flex" key={field.id}>
                                    <input className="w-[86%] outline-none px-3 h-14 rounded mb-4" type="text" id="search" {...register(`participants.${index}.id`)} />
                                    <button className="w-[14%] outline-none h-14 rounded flex justify-center items-center bg-[#6C7099] text-white font-semibold ml-2 hover:bg-[#4f5270] transition"
                                    onClick={() => removeParticipant(index)}
                                    >Remover</button>
                                </div> 
                            ))}
                        </div>
                        {errors.participants && <span className="text-red-500">{errors.participants.message}</span>}
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
            <SnackbarCustom open={suceess} setOpen={setSuccess} />
        </main>
    )
}
