import { useForm } from "react-hook-form";
import { z } from "zod";
import cadastroImg from "../../assets/cadastro.svg";

const signUpFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    language: z.string(),
    birth: z.string().datetime(),
    country: z.string()
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export default function Cadastro() {
    const { register, handleSubmit } = useForm<SignUpFormData>();

    const onSubmit = (data: SignUpFormData) => {
        console.log(data);
    }

    return (
        <main className="w-full h-full flex">
            <div className="md:flex flex-1 flex-col justify-center p-28 sm:hidden">
                <h1 className="flex flex-col max-w-5xl">
                    <span className="lg:text-7xl font-bold md:text-5xl "><span className="text-[#6C7099]">TChat -</span> Junte-se à nossa comunidade global de conversas: </span>
                    <span className="font-semibold lg:text-2xl mt-3 md:text-lg"><span className="text-[#6C7099]">Crie uma conta</span> e comece a
                        <span className="text-[#6C7099]"> conectar-se </span>  instantaneamente com pessoas de todo o mundo, em seus<span className="text-[#6C7099]"> próprios idiomas.</span></span>
                </h1>
                <img src={cadastroImg} alt="Cadastro image" className="lg:max-w-3xl self-end lg:mt-9 md:max-w-xl md:mt-24 md:mr-24" />
            </div>
            <div className="w-full lg:w-[600px] h-full bg-[#6C7099] flex flex-col justify-center items-center px-24">
                <h1 className="text-7xl font-semibold text-white mb-16">Cadastro</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div>
                        <label htmlFor="name" className="text-white font-semibold">Nome</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="text" id="name" {...register("name")} />
                    </div>
                    <div>
                        <br />
                        <label htmlFor="email" className="text-white font-semibold">E-mail</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="email" id="email" {...register("email")} />
                    </div>
                    <div className="flex">
                        <div className="flex-1">
                            <label htmlFor="password" className="text-white font-semibold mt-6">Senha</label>
                            <input className="w-[95%] outline-none px-3 h-14 rounded flex-1" type="password" id="password" {...register("password")} />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="repeat" className="text-white font-semibold mt-6">Repetir senha</label>
                            <input className="w-full outline-none px-3 h-14 rounded flex-1" type="password" id="repeat" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1">
                            <label htmlFor="language" className="text-white font-semibold mt-6">Lingua nativa</label>
                            <input className="w-[95%] outline-none px-3 h-14 rounded flex-1" type="text" id="language" {...register("language")} />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="birth" className="text-white font-semibold mt-6">Nascimento</label>
                            <input className="w-full outline-none px-3 h-14 rounded flex-1" type="date" id="birth" {...register("birth")} />
                        </div>
                    </div>
                    <div>
                        <br />
                        <label htmlFor="country" className="text-white font-semibold">Nacionalidade</label>
                        <select className="w-full outline-none px-3 h-14 rounded" id="country" {...register("country")}>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full outline-none h-14 rounded flex justify-center items-center bg-[#3F4259] text-white font-semibold mt-6 hover:bg-[#2E303C] transition">
                        Concluir
                    </button>
                </form>
            </div>
        </main>
    )
}
