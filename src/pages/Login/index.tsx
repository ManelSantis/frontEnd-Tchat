import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from '@mui/material/CircularProgress';
import { XCircle } from 'lucide-react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import loginImg from "../../assets/login.svg";
import SnackbarCustom from "../../components/SnackbarCustom";
import { requestBackendLogin } from '../../services/api';

const signInFormSchema = z.object({
    username: z.string().nonempty("Campo obrigatório").email("E-mail inválido"),
    password: z.string().nonempty("Campo obrigatório").min(6, "Senha deve conter no mínimo 6 caracteres"),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({ 
        resolver: zodResolver(signInFormSchema) 
    });
    const [openError, setOpenError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: SignInFormData) => {
        setLoading(true);
        requestBackendLogin(data)
            .then(response => {
                setLoading(false);
                localStorage.setItem('authData', JSON.stringify(response.data));
                setSuccess(true);
                setTimeout(() => {
                    navigate('/mainpage/criacaoSala');
                }, 3000);
            })
            .catch(error => {
                setOpenError(true);
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <main className="w-full h-full flex">
            <div className="w-full lg:w-[500px] h-full bg-primary flex flex-col justify-center items-center px-24">
                <h1 className="text-7xl font-semibold text-white mb-16">TChat</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="relative">
                        <label htmlFor="email" className="text-white font-semibold">E-mail</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="email" id="email" {...register("username")} />
                        {errors.username && (
                            <div className="h-auto mt-1 absolute flex items-center">
                                <XCircle className="text-secondary" size={19} />
                                <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.username.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-12 relative">
                        <label htmlFor="password" className="text-white font-semibold">Senha</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="password" id="password" {...register("password")} />
                        {errors.password && (
                           <div className="h-auto mt-1 absolute flex items-center">
                            <XCircle className="text-secondary" size={19} />
                            <p className="text-secondary ml-1 font-semibold text-sm lg:text-xl">{errors.password.message}</p>
                           </div>
                        )}
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full outline-none h-14 rounded flex justify-center items-center bg-tertiary text-white font-semibold mt-14 hover:bg-[#2E303C] transition"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                    </button>
                    <div className="font-semibold text-xl text-[#E5E48C] mt-6">
                        Não tem uma conta? <Link className="text-tertiary hover:text-white" to={'/cadastro'}>Cadastre-se</Link>
                    </div>
                </form>
            </div>
            <div className="md:flex flex-1 flex-col justify-center p-28 sm:hidden">
                <h1 className="flex flex-col max-w-5xl">
                    <span className="lg:text-7xl font-bold md:text-5xl "><span className="text-primary">Conecte-se</span> com o mundo através das palavras</span>
                    <span className="font-semibold lg:text-2xl mt-3 md:text-lg">Entre em nosso chat multilíngue e explore novas línguas e culturas.</span>
                </h1>
                <img src={loginImg} alt="Login image" className="lg:max-w-5xl self-end lg:mt-9 md:max-w-xl md:mt-24" />
            </div>
            <SnackbarCustom open={openError} setOpen={setOpenError} type="error" message="Usuário ou senha incorretos" />
            <SnackbarCustom open={success} setOpen={setSuccess} />
        </main>
    )
}