"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreateRecordForm } from "@/components/forms/createRecordForm";

const page = () => {
  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex items-center justify-center ">
      <Card className="shadow-2xl max-h-dvh overflow-y-auto">
        <CardHeader>
          <h1 className="font-bold text-2xl ml-2">Novo Registro</h1>
          <Separator />
        </CardHeader>
        <CardContent>
          <CreateRecordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
