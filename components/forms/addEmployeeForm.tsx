import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Check, Eye, EyeClosed } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { AddEmployeeData } from "@/lib/authTypes";
import { useRouter } from "next/navigation";
import { addEmployees } from "@/lib/employee";
import { Spinner } from "../ui/spinner";

export default function AddEmployeeForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddEmployeeData>();
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

  function handleToggle(pressed: boolean) {
    setIsAdmin(pressed);
    console.log(pressed);
  }

  async function onSubmit(formData: AddEmployeeData) {
    const valid = validatePasswordMatch(
      formData.password,
      formData.confirmPassword
    );
    if (valid) {
      setIsLoading(true);
      const formatData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: isAdmin,
      };
      try {
        const response = await addEmployees(formatData);
        window.location.reload();
        return response;
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <Card className="shadow-2xl">
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Digite o nome do Funcionário"
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
              placeholder="Digite o email do Funcionário"
            />
            {errors.email && (
              <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                Este campo é obrigatório
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3  [&>label]:ml-2">
            <label htmlFor="email">Senha</label>
            <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>input]:w-full relative ">
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
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Digite a senha do Funcionário"
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
            <label htmlFor="email">Confirmar Senha</label>
            <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>input]:w-full relative ">
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
                {...register("confirmPassword", { required: true })}
                placeholder="Confirme a senha do funcionário"
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
          <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
            <Toggle
              aria-label="Toggle admin"
              size="sm"
              pressed={isAdmin}
              onPressedChange={handleToggle}
              variant="outline"
              className="data-[state=on]:dark:bg-zinc-100 data-[state=on]:bg-zinc-950 data-[state=on]:text-zinc-100 data-[state=on]:dark:text-zinc-950"
            >
              <div className="flex items-center justify-between  w-full px-4 py-2">
                <span>Administrador</span>
                <Check />
              </div>
            </Toggle>
          </div>
          <div className="text-center flex flex-col gap-2">
            {isLoading ? (
              <Button
                disabled
                className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300"
              >
                <Spinner />
                Criando...
              </Button>
            ) : (
              <Button
                type="submit"
                className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300"
              >
                Adicionar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
