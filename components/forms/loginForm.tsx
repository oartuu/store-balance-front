import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginData, LoginResponse } from "@/lib/authTypes";
import { Spinner } from "../ui/spinner";
import { UserLogin } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    try{
     const response:LoginResponse = await UserLogin(formData)
     localStorage.setItem("auth_token", response.token)
     localStorage.setItem("user", response.user.name )
     localStorage.setItem("is_admin", response.user.isAdmin.toString() )
     router.push("/admin")
    }catch (err){
        console.log(err)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
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
          {...register("email", { required: true })}
          placeholder="Digite seu Email"
        />
        {errors.email && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            Este campo é obrigatório
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
