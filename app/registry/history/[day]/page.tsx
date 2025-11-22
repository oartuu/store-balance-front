"use client";
import RecordsItem from "@/components/recordsItem";
import Header from "@/components/template/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { finishDay, getDayRecord } from "@/lib/records";
import { DayRecordResponse } from "@/lib/recordsTypes";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{
    day: string;
  }>;
}
const page = ({ params }: PageProps) => {
  const { day } = use(params);
  const [dayRecords, setDayRecords] = useState<DayRecordResponse>();
  const [recordsCount, setRecordsCount] = useState(0);
  const [isDayOpen, setIsDayOpen] = useState(true);
const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchApi() {
       setIsLoading(true);
      try {
        const teste = { date: `${day}T03:00:00.000Z` };
        console.log(teste);
        const response: DayRecordResponse = await getDayRecord(teste);
        console.log(response);
        setDayRecords(response);
        setRecordsCount(response.records.length);
        setIsDayOpen(response.isOpen);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
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

  async function handleFinishDay() {
    try {
      const day = "";
      const response = await finishDay(day);
      console.log(response);
      window.location.reload();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header
        title={
          dayRecords?.date
            ? `Histórico do Dia ${formatDateBR(dayRecords.date)}`
            : "Histórico"
        }
      />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-hidden">
        <section className="flex-1 flex flex-col justify-between overflow-hidden gap-6 p-4 ">
          <h1 className="text-xl font-bold">
            {recordsCount > 1
              ? `${recordsCount} Registros`
              : `${recordsCount} Registro`}
            <br />
            <span className="text-lg font-bold">
              {isDayOpen ? "Dia Aberto" : "Dia Fechado"}
            </span>
          </h1>

          <div className="flex flex-1 flex-col justify-start gap-4 overflow-y-auto">
            {isLoading ? (
              <div className="flex-1 w-full flex items-center justify-center ">
                <Spinner className="size-10" />
              </div>
            ) : null}
            {dayRecords?.records.map((record) => {
              const mappedItems = record.items.map((item) => ({
                title: item.title,
                price: item.price,
                id: item.id,
              }));

              return (
                <RecordsItem
                  key={record.id}
                  title={record.title}
                  total={record.total}
                  items={mappedItems}
                />
              );
            })}
          </div>

          {isDayOpen ? <Separator /> : null}
        </section>
      </main>
    </div>
  );
};

export default page;
