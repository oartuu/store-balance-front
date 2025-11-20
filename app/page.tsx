'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getApiStatus } from "@/lib/auth";


export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const data = await getApiStatus();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult("Erro ao chamar API");
    } finally {
      setLoading(false);
      
    }
  }
  return (
    <div className=" dark:bg-zinc-900 w-dvw h-dvh flex items-center justify-center">
      
      <Button onClick={handleClick}>testar API</Button>
      {result ?? (
        <span>{JSON.stringify(result, null, 2)}</span>
      )}
    </div>
  );
}
