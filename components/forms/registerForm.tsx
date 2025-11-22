import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { RegisterData, RegisterResponse } from "@/lib/authTypes";
import { useForm } from "react-hook-form";
import { Spinner } from "../ui/spinner";
import { RegisterCompany } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const handleShowConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };

  function validatePasswordMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return false;
    } else {
      setPasswordMatch(true);
      return true;
    }
  }

  async function onSubmit(formData: RegisterData) {
    const valid = validatePasswordMatch(
      formData.password,
      formData.confirmPassword
    );
    if (valid) {
      setLoading(true);
      try {
        const response = await RegisterCompany(formData);
        // Verifica algo específico no response para garantir que é sucesso "real"
        if (!response.token) {
          // Se por algum motivo não tem token, trata como erro
          setError(true)
          return
        }

        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user_name", response.user.name )
        localStorage.setItem("is_admin", response.user.isAdmin.toString()) 
        router.push("/admin");
      } catch (err: any) {
        console.error("Erro no registro:", err);
        setError(true);

        // Se quiser, pode extrair mensagem do servidor:
        if (err.response) {
          // Erro HTTP
          console.log("Status:", err.response.status);
          console.log("Erro retornado:", err.response.data);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
      {error ? (
        <div className="w-full border border-red-400 bg-red-300/60 p-4 rounded-md text-center">
          <span className="">Empresa ou Email já cadastrados</span>
        </div>
      ) : null}
      <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
        <label htmlFor="companyName">Nome da Empresa</label>
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
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Digite seu Nome"
        />
        {errors.name && (
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
        <label htmlFor="email">Senha</label>
        <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md relative">
          {showPassword ? (
            <Eye
              onClick={handleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
            />
          ) : (
            <EyeClosed
              onClick={handleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
            />
          )}
          <input
            className="w-full"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Digite sua Senha"
          />
        </div>
        {errors.password && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            Este campo é obrigatório
          </span>
        )}
        {!passwordMatch && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            As senhas não são iguais
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3  [&>label]:ml-2">
        <label htmlFor="email">Confirmar senha</label>
        <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md relative">
          {showConfirmPassword ? (
            <Eye
              onClick={handleShowConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
            />
          ) : (
            <EyeClosed
              onClick={handleShowConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
            />
          )}
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full"
            {...register("confirmPassword", { required: true })}
            placeholder="Digite sua Senha"
          />
        </div>
        {errors.confirmPassword && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            Este campo é obrigatório
          </span>
        )}
        {!passwordMatch && (
          <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
            As senhas não são iguais
          </span>
        )}
      </div>
      <div className="text-center flex flex-col gap-2">
        {loading ? (
          <Button
            disabled
            className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300"
          >
            <Spinner />
            Cadastrando...
          </Button>
        ) : (
          <Button
            type="submit"
            className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300"
          >
            Cadastrar
          </Button>
        )}
        <p className="font-light text-sm dark:text-zinc-300 [&>a]:underline [&>a]:dark:text-zinc-50">
          Já tem uma conta? <Link href="/login">Entrar</Link>
        </p>
      </div>
    </form>
  );
}
