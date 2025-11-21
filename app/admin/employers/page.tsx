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

const page = () => {
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        const response: User[] = await getEmployees();
        setEmployees(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi();
  }, []);

  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex flex-col justify-start py-5">
      <Header title="Funcionários" />

      <main className=" flex-1 flex flex-col justify-start gap-8 px-2 overflow-y-scroll">
        <section className="flex flex-col gap-6 p-4 ">
          <h1 className="text-xl font-bold">Todos</h1>

          {employees
            ? employees.map((employee) => (
                <EmployeeItem
                  key={employee.id}
                  name={employee.name}
                  role={employee.isAdmin}
                />
              ))
            : null}

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
              <AddEmployeeForm/>
            </DialogContent>
          </Dialog>
        </section>
      </main>
    </div>
  );
};

export default page;
