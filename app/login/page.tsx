"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShorPassWord = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex items-center justify-center">
      <Card className="shadow-2xl">
        <CardHeader>
          <h1 className="font-bold text-2xl ml-2">Login</h1>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Digite seu email" />
            </div>
            <div className="flex flex-col gap-3  [&>label]:ml-2">
              <label htmlFor="email">Senha</label>
              <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md relative">
                {showPassword ? (
                  <Eye
                    onClick={handleShorPassWord}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
                  />
                ) : (
                  <EyeClosed
                    onClick={handleShorPassWord}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
                  />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua Senha"
                />
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <Button className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300">
                Entrar
              </Button>
              <p className="font-light text-sm dark:text-zinc-300 [&>a]:underline [&>a]:dark:text-zinc-50">
                Não tem uma conta? <Link href="/register">Cadastre-se</Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
