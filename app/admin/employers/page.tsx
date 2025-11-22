"use client";
import EmployeeItem from "@/components/employeeItem";
import Header from "@/components/template/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User } from "@/lib/authTypes";
import { useEffect, useState } from "react";
import { getEmployees } from "@/lib/employee";
import AddEmployeeForm from "@/components/forms/addEmployeeForm";
import { Spinner } from "@/components/ui/spinner";

const page = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchApi() {
      setIsLoading(true);
      try {
        const response: User[] = await getEmployees();
        setEmployees(response);
      } catch (err) {
        console.log(err);
      }finally{
        setIsLoading(false)
      }
    }
    fetchApi();
  }, []);

  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header title="Funcionários" />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-hidden ">
        <section className="flex flex-col gap-6 p-4 flex-1 overflow-y-auto ">
          <h1 className="text-xl font-bold">Todos</h1>

          {isLoading ? (
            <div className="flex-1 w-full flex items-center justify-center ">
              <Spinner className="size-10" />
            </div>
          ) : null}

          {employees
            ? employees.map((employee) => (
                <EmployeeItem
                  key={employee.id}
                  name={employee.name}
                  role={employee.isAdmin}
                />
              ))
            : null}
        </section>
        <section className="flex flex-col gap-6 p-4 ">
          <Separator />
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
              <AddEmployeeForm />
            </DialogContent>
          </Dialog>
        </section>
      </main>
    </div>
  );
};

export default page;
