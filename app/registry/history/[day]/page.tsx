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

  useEffect(() => {
    async function fetchApi() {
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

          <div className="flex flex-col justify-between gap-4 overflow-y-auto scroll-bg">
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
        <section className="flex flex-col gap-6 p-4 ">
          <Dialog>
            <DialogTrigger asChild>
              {isDayOpen ? (
                <Button className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300 text-shadow-muted">
                  Fechar o dia
                </Button>
              ) : null}
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
                      <Button
                        onClick={handleFinishDay}
                        className="shadow-md hover:cursor-pointer hover:bg-red-300 hover:border bg-red-400 text-zinc-50  transition-all duration-300"
                      >
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
