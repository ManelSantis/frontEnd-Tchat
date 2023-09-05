import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import cadastroImg from "../../assets/cadastro.svg";
import SnackbarCustom from "../../components/SnackbarCustom";
import { requestBackendSignUp } from "../../services/api";
import { getCountries } from "../../services/countries";

const signUpFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório").max(50, "Nome deve conter no máximo 50 caracteres"),
    email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
    password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
    defaultLanguage: z.string(),
    birthDate: z.string().pipe(z.coerce.date()),
    nationality: z.string().nonempty("País é obrigatório"),
}).refine((data) => 
    data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
    }
);

type country = {
    id: {
        "ISO-3166-1-ALPHA-2": string;
    };
    nome: {
        "abreviado": string;
    };
    linguas: [{nome: string}]

}

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export default function Cadastro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema)
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<country[]>([]);

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const country = countries.find(country => country.nome["abreviado"] === event.target.value);
        if(country) {
            setValue("defaultLanguage", country.linguas[0].nome);
        }
    }

    const onSubmit = (data: SignUpFormData) => {
        setLoading(true);
        requestBackendSignUp(data)
            .then(response => {
                setSuccess(true);
                setLoading(false);
                console.log(response);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getCountries().then(response => {   
            const arr: country[] = [];
            response.data.forEach((country: country) => {
                arr.find((c: country) => c.nome["abreviado"] === country.nome["abreviado"]) ? null : arr.push(country);
            });
            
            setCountries(arr);
        }).catch(error => {
            console.log(error);
        });

    }, []);

    return (
        <main className="w-full h-full flex">
            <div className="md:flex flex-1 flex-col justify-center p-28 sm:hidden">
                <h1 className="flex flex-col max-w-5xl">
                    <span className="lg:text-7xl font-bold md:text-5xl "><span className="text-primary">TChat -</span> Junte-se à nossa comunidade global de conversas: </span>
                    <span className="font-semibold lg:text-2xl mt-3 md:text-lg"><span className="text-pribg-primary">Crie uma conta</span> e comece a
                        <span className="text-pribg-primary"> conectar-se </span>  instantaneamente com pessoas de todo o mundo, em seus<span className="text-pribg-primary"> próprios idiomas.</span></span>
                </h1>
                <img src={cadastroImg} alt="Cadastro image" className="lg:max-w-3xl self-end lg:mt-9 md:max-w-xl md:mt-24 md:mr-24" />
            </div>
            <div className="w-full lg:w-[600px] h-full bg-primary flex flex-col justify-center items-center px-24">
                <h1 className="text-7xl font-semibold text-white mb-6">Cadastro</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div>
                        <label htmlFor="name" className="text-white font-semibold">Nome</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="text" id="name" {...register("name")} />
                        {errors.name && (
                            <div className="h-auto mt-1 absolute flex items-center">
                                <XCircle className="text-secondary" size={19} />
                                <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.name.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-10">
                        <label htmlFor="email" className="text-white font-semibold">E-mail</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="email" id="email" {...register("email")} />
                        {errors.email && (
                            <div className="h-auto mt-1 absolute flex items-center">
                                <XCircle className="text-secondary" size={19} />
                                <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.email.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full flex gap-8 sm:flex-col lg:flex-row mt-4">
                        <div className="flex-1">
                            <label htmlFor="password" className="text-white font-semibold mt-6">Senha</label>
                            <input className="w-full outline-none px-3 h-14 rounded" type="password" id="password" {...register("password")} />
                            {errors.password && (
                            (
                                <div className="h-auto mt-1 absolute flex items-center">
                                    <XCircle className="text-secondary" size={19} />
                                    <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.password.message}</p>
                                </div>
                            )
                            )}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="repeat" className="text-white font-semibold mt-6">Repetir senha</label>
                            <input className="w-full outline-none px-3 h-14 rounded" type="password" id="repeat"  {...register("confirmPassword")}/>
                            {errors.confirmPassword && (
                            <div className="h-auto mt-1 absolute flex items-center">
                                <XCircle className="text-secondary" size={19} />
                                <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.confirmPassword.message}</p>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="w-full flex gap-8 sm:flex-col lg:flex-row mt-6">
                        <div className="flex-1">
                            <label htmlFor="country" className="text-white font-semibold mt-6">Nacionalidade</label>
                            <select className="w-full outline-none text-black px-3 h-14 rounded" id="country" {...register("nationality")}
                            onChange={handleLanguage}
                            >
                                <option value="">Selecione um país</option>
                                {
                                    countries.map(country => (
                                        <option 
                                            key={country.id["ISO-3166-1-ALPHA-2"]} value={country.nome["abreviado"]}
                                        >{`${country.id["ISO-3166-1-ALPHA-2"]} - ${country.nome["abreviado"]}`}</option>
                                    ))
                                }
                            </select>
                            {errors.nationality && (
                                 <div className="h-auto mt-1 absolute flex items-center">
                                 <XCircle className="text-secondary" size={19} />
                                 <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.nationality.message}</p>
                             </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="birth" className="text-white font-semibold mt-6">Nascimento</label>
                            <input className="w-full outline-none px-3 h-14 rounded" type="date" id="birth" {...register("birthDate")} />
                            {errors.birthDate && (
                            <div className="h-auto mt-1 absolute flex items-center">
                                <XCircle className="text-secondary" size={19} />
                                <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.birthDate.message}</p>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="language" className="text-white font-semibold mt-6">Lingua nativa</label>
                        <input className="w-full outline-none px-3 h-14 rounded" type="text" id="language" disabled {...register("defaultLanguage")} />
                        {errors.defaultLanguage && (
                            <div className="h-auto mt-1 absolute flex items-center">
                                <XCircle className="text-secondary" size={19} />
                                <p className="text-secondary ml-1 font-semibold sm:text-sm lg:text-xl">{errors.defaultLanguage.message}</p>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full outline-none h-14 rounded flex justify-center items-center bg-tertiary text-white font-semibold mt-11 hover:bg-[#2E303C] transition">
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Concluir"}
                    </button>
                </form>
            </div>
            <SnackbarCustom open={success} setOpen={setSuccess} />
        </main>
    )
}
