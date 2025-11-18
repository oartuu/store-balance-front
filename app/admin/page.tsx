import Header from "@/components/template/header";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { ChevronRight } from "lucide-react";

const page = () => {
  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header title="Administrador" />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-scroll">
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Hoje</h1>
          <Item
            variant={"outline"}
            className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>70 vendas</ItemContent>
            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
        </section>
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Histórico</h1>
          <Item
            variant={"outline"}
            className="shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>vendas 17/11/25</ItemContent>
            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
          <Item
            variant={"outline"}
            className="shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>vendas 17/11/25</ItemContent>
            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
          <Item
            variant={"outline"}
            className="shadow-md dark:shadow-2xl hover:cursor-pointer"
          >
            <ItemContent>vendas 17/11/25</ItemContent>
            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
        </section>
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Gráfico</h1>
          <div className="w-full h-48 flex items-center justify-center border rounded-md ">
            Em desenvolvimento...
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
