"use client"
import { Separator } from "../ui/separator";
import { ChevronRight, LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Item, ItemContent } from "../ui/item";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
   const [admin, setAdmin] = useState<string | null>(null);

   useEffect(() => {
     const value = localStorage.getItem("is_admin");
     setAdmin(value);
   }, []);
  return (
    <div className="w-full px-4 flex flex-col gap-3">
      <div className="w-full flex justify-between [&>h1]:text-2xl [&>h1]:font-bold px-2">
        <h1>{title}</h1>
        <Sheet>
          <SheetTrigger asChild>
            {admin === "true"? (<Menu className="mt-1 hover:cursor-pointer" />) : null}
          </SheetTrigger>
          <SheetContent className="dark:bg-zinc-900 p-4">
            <SheetTitle className="text-2xl font-bold">
              Menu
              <Separator />
            </SheetTitle>
            <div className="">
              <div>
                <ul className="flex flex-col gap-5">
                  <li className="p-2">
                    <div className="flex justify-between">
                      <Link href="/admin">Painel de Administrador</Link>
                      <ChevronRight />
                    </div>
                    <Separator />
                  </li>
                  <li className="p-2">
                    <div className="flex justify-between">
                      <Link href="/admin/employers" >Funcionários</Link>
                      <ChevronRight />
                    </div>
                    <Separator />
                  </li>
                  <li className="p-2">
                    <div className="flex justify-between">
                      <Link href="/registry/record/create">Novo Registro</Link>
                      <ChevronRight />
                    </div>
                    <Separator />
                  </li>
                  <li className="p-2">
                    <div className="flex justify-between">
                      <Link href="/registry/history">Histórico do Dia</Link>
                      <ChevronRight />
                    </div>
                    <Separator />
                  </li>
                </ul>
              </div>
            </div>
            <SheetFooter className="items-center">
              <Separator />
              <Item
                variant={"outline"}
                className="shadow-md dark:shadow-2xl w-4/5 hover:cursor-pointer"
              >
                <ItemContent>
                  <div className="flex justify-between">
                    <h2>Administrador</h2>
                    <LogOut />
                  </div>
                </ItemContent>
              </Item>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <Separator />
    </div>
  );
}

export default Header;
