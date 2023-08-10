import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import loginImg from "../../assets/login.svg";

const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export default function Login() {
    const { register, handleSubmit } = useForm<SignInFormData>();

    const onSubmit = (data: SignInFormData) => {
        console.log(data);
    }

    return (
        <main className="w-full h-full flex">
            <div className="w-full lg:w-[500px] h-full bg-[#6C7099] flex flex-col justify-center items-center px-24">
                <h1 className="text-7xl font-semibold text-white mb-16">TChat</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div>
                        <label htmlFor="email" className="text-white font-semibold">E-mail</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="email" id="email" {...register("email")} />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white font-semibold mt-6">Senha</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="password" id="password" {...register("password")} />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full outline-none h-14 rounded flex justify-center items-center bg-[#3F4259] text-white font-semibold mt-6 hover:bg-[#2E303C] transition"
                    >
                        Entrar
                    </button>
                    <div className="font-semibold text-xl text-[#E5E48C] mt-6">
                        Não tem uma conta? <Link className="text-[#3F4259] hover:text-white" to={'/cadastro'}>Cadastre-se</Link>
                    </div>
                </form>
            </div>
            <div className="md:flex flex-1 flex-col justify-center p-28 sm:hidden">
                <h1 className="flex flex-col max-w-5xl">
                    <span className="lg:text-7xl font-bold md:text-5xl "><span className="text-[#6C7099]">Conecte-se</span> com o mundo através das palavras</span>
                    <span className="font-semibold lg:text-2xl mt-3 md:text-lg">Entre em nosso chat multilíngue e explore novas línguas e culturas.</span>
                </h1>
                <img src={loginImg} alt="Login image" className="lg:max-w-5xl self-end lg:mt-9 md:max-w-xl md:mt-24" />
            </div>
        </main>
    )
}