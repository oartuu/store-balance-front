"use client";
import Header from "@/components/template/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

import {
  BookmarkIcon,
  Check,
  ChevronRight,
  Eye,
  EyeClosed,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header title="Funcionários" />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-scroll">
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Todos</h1>
          <Item
            variant={"outline"}
            className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>
              <ItemTitle>Arthur</ItemTitle>
              <ItemDescription className="flex flex-col ">
                <span>Cargo: Administrador</span>
                <span>Registros: 50</span>
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
          <Item
            variant={"outline"}
            className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>
              <ItemTitle>Cleiton</ItemTitle>
              <ItemDescription className="flex flex-col ">
                <span>Cargo: Funcionário</span>
                <span>Registros: 430</span>
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
          <Item
            variant={"outline"}
            className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>
              <ItemTitle>Cleiton</ItemTitle>
              <ItemDescription className="flex flex-col ">
                <span>Cargo: Funcionário</span>
                <span>Registros: 430</span>
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
          <Item
            variant={"outline"}
            className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>
              <ItemTitle>Cleiton</ItemTitle>
              <ItemDescription className="flex flex-col ">
                <span>Cargo: Funcionário</span>
                <span>Registros: 430</span>
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>

          <Separator />
        </section>
        <section className="flex flex-col gap-6 p-4 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300 text-shadow-muted">
                Adicionar Funcionário
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-zinc-900">
              <DialogTitle className="flex flex-col gap-2">
                <span>Adicionar Funcionário</span>
                <Separator />
              </DialogTitle>
              <Card className="shadow-2xl">
                <CardContent>
                  <div className="flex flex-col gap-4 ">
                    <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
                      <label htmlFor="email">Nome</label>
                      <input type="text" placeholder="Digite o nome do funcionário" />
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
                          placeholder="Digite a senha do funcionário"
                        />
                      </div>
                      <div className="flex flex-col gap-3 [&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md [&>label]:ml-2">
                        <Toggle
                          aria-label="Toggle admin"
                          size="sm"
                          variant="outline"
                          className="data-[state=on]:dark:bg-zinc-100 data-[state=on]:bg-zinc-950 data-[state=on]:text-zinc-100 data-[state=on]:dark:text-zinc-950"
                        >
                          <div className="flex items-center justify-between  w-full px-4 py-2">
                            <span>Administrador</span>
                            <Check />
                          </div>
                        </Toggle>
                      </div>
                    </div>
                    <div className="text-center flex flex-col gap-2">
                      <Button className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
        </section>
      </main>
    </div>
  );
};

export default page;
