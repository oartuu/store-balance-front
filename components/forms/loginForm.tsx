import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginData, LoginResponse } from "@/lib/authTypes";
import { Spinner } from "../ui/spinner";
import { UserLogin } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>();

  const handleShowPassWord = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  async function onSubmit(formData: LoginData) {
    setIsLoading(true)
     try {
       const response  = await UserLogin(formData);
       // Supondo que a resposta tem: { accessToken: string, ... }
       console.log(Cookies.get())
       // Salva o access token
       localStorage.setItem("auth_token", response);

       // Redireciona
       router.push("/registry/record/create");
     } catch (error: any) {
       setErrMessage(error.message)
       setError(true);
     } finally {
       setIsLoading(false);
     }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
      {error ? (
        <div className="w-full border border-red-400 bg-red-300/60 p-4 rounded-md text-center">
          <span className="">{errMessage}</span>
        </div>
      ) : null}
      <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
        <label htmlFor="company">Empresa</label>
        <input
          type="text"
          {...register("companyName", { required: true })}
          placeholder="Digite o nome da Empresa"
        />
        {errors.companyName && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            Este campo é obrigatório
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          {...register("email", {
            required: "O email é obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/, // regex básica para email
              message: "Insira um email válido",
            },
          })}
          placeholder="Digite seu Email"
        />
        {errors.email && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3  [&>label]:ml-2">
        <label htmlFor="password">Senha</label>
        <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md relative">
          {showPassword ? (
            <Eye
              onClick={handleShowPassWord}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
            />
          ) : (
            <EyeClosed
              onClick={handleShowPassWord}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
            />
          )}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua Senha"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            Este campo é obrigatório
          </span>
        )}
      </div>
      <div className="text-center flex flex-col gap-2">
        {isLoading ? (
          <Button
            disabled
            className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300"
          >
            <Spinner />
            Entrando...
          </Button>
        ) : (
          <Button
            type="submit"
            className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300"
          >
            Entrar
          </Button>
        )}
        <p className="font-light text-sm dark:text-zinc-300 [&>a]:underline [&>a]:dark:text-zinc-50">
          Não tem uma conta? <Link href="/register">Cadastre-se</Link>
        </p>
      </div>
    </form>
  );
}
