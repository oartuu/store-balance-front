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
import { finishDay, getDayRecord, startDay } from "@/lib/records";
import { DayRecordResponse } from "@/lib/recordsTypes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderX } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const [dayRecords, setDayRecords] = useState<DayRecordResponse>();
  const [recordsCount, setRecordsCount] = useState(1);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const router = useRouter()
  useEffect(() => {
    async function fetchApi() {
      setIsLoading(true);
      try {
        const isAdmin = Cookies.get("isAdmin") === "true";
        setIsAdmin(isAdmin);
        const today = new Date();
        const response: DayRecordResponse = await getDayRecord(today);
        console.log(response);
        setDayRecords(response);
        setRecordsCount(response.records.length);
        setIsDayOpen(response.isOpen);
      } catch (error:any) {
        setErrMessage(error.message)
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
      router.push("/admin")
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async function handleStartDay() {
    try {
      const response = await startDay();
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
            ? `Histórico do Dia ${formatDateBR(dayRecords.createdAt)}`
            : "Histórico"
        }
      />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-hidden">
        {dayRecords && recordsCount > 0 ? (
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
                    type={record.type}
                    items={mappedItems}
                  />
                );
              })}
            </div>

            <Separator />
          </section>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderX />
              </EmptyMedia>
              <EmptyTitle>{errMessage}</EmptyTitle>
              <EmptyDescription>
                {errMessage === "Ainda não existem registros."
                  ? "Nenhum registro encontrado."
                  : "Inicie um novo dia, para que os funcionários criem registros."}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                {isAdmin ? (
                  <>
                    {errMessage === "Ainda não existem registros." ? (
                      <Button className="hover:cursor-pointer">
                        <Link href={"/registry/record/create"}>
                          Novo Registro
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStartDay}
                        className="hover:cursor-pointer"
                      >
                        iniciar o Dia
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
            </EmptyContent>
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            ></Button>
          </Empty>
        )}
        {isAdmin ? (
          <section className="flex flex-col gap-6 p-4 ">
            <Dialog>
              <DialogTrigger asChild>
                {isDayOpen && !isLoading ? (
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
        ) : (
          <section className="flex flex-col gap-6 p-4 ">
            <Link href="/registry/record/create" className="w-full">
              <Button className="shadow-md hover:cursor-pointer hover:bg-transparent hover:border hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300 text-shadow-muted w-full">
                Novo Registro
              </Button>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
};

export default page;
