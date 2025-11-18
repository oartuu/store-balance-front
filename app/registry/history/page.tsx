"use client";
import Header from "@/components/template/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

import { Check, ChevronRight, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

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
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header title="Histórico do Dia" />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-hidden">
        <section className="flex-1 flex flex-col justify-between overflow-hidden gap-6 p-4 ">
          <h1 className="text-xl font-bold">70 vendas</h1>
          <div className="flex flex-col justify-between gap-4 overflow-y-scroll scroll-bg">
            <Item
              variant={"outline"}
              className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
            >
              <ItemContent>
                <ItemTitle>Venda 70</ItemTitle>
                <ul className="list-disc p-4">
                  <li>Mercado: R$ 4,50</li>
                  <li>Feira: R$ 10,30</li>
                  <li>Água: R$ 6,50</li>
                  <li>Mercado: R$ 7,50</li>
                </ul>
                <span className="underline">TOTAL: R$28,80</span>
              </ItemContent>
            </Item>
            <Item
              variant={"outline"}
              className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
            >
              <ItemContent>
                <ItemTitle>Venda 70</ItemTitle>
                <ul className="list-disc p-4">
                  <li>Mercado: R$ 4,50</li>
                  <li>Feira: R$ 10,30</li>
                  <li>Água: R$ 6,50</li>
                  <li>Mercado: R$ 7,50</li>
                </ul>
                <span className="underline">TOTAL: R$28,80</span>
              </ItemContent>
            </Item>
            <Item
              variant={"outline"}
              className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
            >
              <ItemContent>
                <ItemTitle>Venda 70</ItemTitle>
                <ul className="list-disc p-4">
                  <li>Mercado: R$ 4,50</li>
                  <li>Feira: R$ 10,30</li>
                  <li>Água: R$ 6,50</li>
                  <li>Mercado: R$ 7,50</li>
                </ul>
                <span className="underline">TOTAL: R$28,80</span>
              </ItemContent>
            </Item>
            <Item
              variant={"outline"}
              className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
            >
              <ItemContent>
                <ItemTitle>Venda 70</ItemTitle>
                <ul className="list-disc p-4">
                  <li>Mercado: R$ 4,50</li>
                  <li>Feira: R$ 10,30</li>
                  <li>Água: R$ 6,50</li>
                  <li>Mercado: R$ 7,50</li>
                </ul>
                <span className="underline">TOTAL: R$28,80</span>
              </ItemContent>
            </Item>
          </div>

          <Separator />
        </section>
        <section className="flex flex-col gap-6 p-4 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300 text-shadow-muted">
                Fechar o dia
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-zinc-900">
              <DialogTitle className="flex flex-col gap-2">
                <span>Confirmação Necessária</span>
                <Separator />
              </DialogTitle>
              <Card className="shadow-2xl">
                <CardContent>
                  <div className="flex flex-col gap-4 text-center ">
                    <h1>Não é possível reverter esta ação</h1>
                    <div className="text-center flex flex-col gap-2">
                      <Button className="shadow-md hover:cursor-pointer hover:bg-red-300 hover:border bg-red-400 text-zinc-50  transition-all duration-300">
                        Confirmar
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
