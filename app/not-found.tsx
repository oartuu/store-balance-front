// app/not-found.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const imagem = "./images/404.svg";
export default function NotFound() {
  return (
    <div className="flex dark:bg-zinc-900 flex-col items-center justify-center h-screen text-center ">
      <h2 className="text-5xl font-bold mt-4">Página não encontrada</h2>
      <div
        className="h-full w-full bg-no-repeat bg-center flex items-end justify-center pb-20"
        style={{ backgroundImage: "url('/404.svg')" }}
      ></div>
      <Link href="/" className="">
        <Button className="mb-5 hover:cursor-pointer">voltar</Button>
      </Link>
    </div>
  );
}
