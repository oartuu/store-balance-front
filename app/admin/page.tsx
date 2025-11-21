"use client";

import DayRecordsItem from "@/components/dayRecordsItem";
import Header from "@/components/template/header";
import TodayRecordsItem from "@/components/todayRecordsItem";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { getDayRecords, getTodayRecords } from "@/lib/records";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const [todayRecords, setTodayRecords] = useState<any>([]);
  const [dayRecords, setDayRecords] = useState<any[]>([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        const todayRecordsResponse = await getTodayRecords();
        const dayRecordsResponse = await getDayRecords();
        setTodayRecords(todayRecordsResponse);
        setDayRecords(dayRecordsResponse);
        console.log(dayRecordsResponse);
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi();
  }, []);

  function formatDateBR(isoString: string) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
    }).format(date);
  }

  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header title="Administrador" />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-scroll">
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Hoje</h1>
          <TodayRecordsItem recordsCount={todayRecords.length} />
        </section>
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Histórico</h1>

          {dayRecords ? (dayRecords.map((record) =>(
            <DayRecordsItem
            recordsDate={formatDateBR(record.date)}
            key={record.id}
            />
          ) )) : null }
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
