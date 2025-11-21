"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/forms/loginForm";

const page = () => {
 

  return (
    <div className="dark:bg-zinc-900 w-dvw h-dvh flex items-center justify-center">
      <Card className="shadow-2xl">
        <CardHeader>
          <h1 className="font-bold text-2xl ml-2">Login</h1>
          <Separator />
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
