"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { createRecord } from "@/lib/records";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Regex para permitir apenas dígitos e vírgula
const numberCommaRegex = /^\d*(,\d*)*$/;

const formSchema = z.object({
  type: z.enum(["SALE", "WITHDRAW"], "Tipo inválido"),
  origin: z.enum(["CASH", "CARD"], "Tipo inválido"),
  items: z
    .array(
      z.object({
        title: z.enum(
          ["mercado", "agua", "horti-fruti", "outro"],
          "Título do item inválido"
        ),
        price: z.string().refine((val) => numberCommaRegex.test(val), {
          message: "Deve conter apenas números e vírgula",
        }),
      })
    )
    .min(1, "Deve haver pelo menos 1 item"),
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateRecordForm() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const[errMessage, setErrMessage] = useState("")
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "SALE",
      origin: "CASH",
      items: [
        {
          title: "mercado",
          price: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  function getTitle(origin: string, type: string): string {
    let title = "";

    if (type === "SALE") {
      title += "Venda: ";
    } else if (type === "WITHDRAW") {
      title += "Retirada: ";
    } else {
      title += "desconhecido: ";
    }

    if (origin === "CASH") {
      title += "Dinheiro";
    } else if (origin === "CARD") {
      title += "Cartão ou Pix";
    } else {
      title += "Método desconhecido";
    }

    return title;
  }

  const onSubmit = async (data: FormSchema) => {
    // Converte a string price (ex: "12,34") para número (12.34)
    const formattedItems = data.items.map((item) => ({
      ...item,
      price: parseFloat(item.price.replace(/,/g, ".")),
    }));
    const title = getTitle(data.origin, data.type);
    const formatData = {
      title: title,
      type: data.type,
      origin: data.origin,
      items: formattedItems,
    };
    try{
        const response = await createRecord(formatData);
        router.push("/registry/history");
    }catch (error:any){
      setErrMessage(error.message)
      setError(true)
      
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Título principal */}
        {error ? (
          <div className="w-full border border-red-400 bg-red-300/60 p-4 rounded-md text-center">
            <span className="">{errMessage}</span>
          </div>
        ) : null}
        {/* Tipo (Select: Venda / Retirada) */}
        <FormField
          control={form.control}
          name="origin"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Pagamento</FormLabel>
              <FormControl>
                <Controller
                  name="origin"
                  control={form.control}
                  defaultValue={field.value}
                  render={({ field: selField }) => (
                    <Select
                      value={selField.value}
                      onValueChange={selField.onChange}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!fieldState.error}
                      >
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASH">Dinheiro</SelectItem>
                        <SelectItem value="CARD">Cartão ou Pix</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Controller
                  name="type"
                  control={form.control}
                  defaultValue={field.value}
                  render={({ field: selField }) => (
                    <Select
                      value={selField.value}
                      onValueChange={selField.onChange}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!fieldState.error}
                      >
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SALE">Venda</SelectItem>
                        <SelectItem value="WITHDRAW">Retirada</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Itens dinamicamente */}
        <div className="space-y-4">
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col items-start gap-4">
              {/* Select para o título do item */}
              <FormField
                control={form.control}
                name={`items.${index}.title`}
                render={({ field: titleField, fieldState }) => (
                  <FormItem className="flex-1 w-full ">
                    <FormLabel className="w-full flex justify-between">
                      Item {index + 1} - Tipo
                      <X size={18} onClick={() => remove(index)} />
                    </FormLabel>
                    <FormControl>
                      <Controller
                        name={`items.${index}.title`}
                        control={form.control}
                        defaultValue={titleField.value}
                        render={({ field: selField }) => (
                          <Select
                            value={selField.value}
                            onValueChange={selField.onChange}
                          >
                            <SelectTrigger
                              className="w-full"
                              aria-invalid={!!fieldState.error}
                            >
                              <SelectValue placeholder="Selecione item" />
                            </SelectTrigger>
                            <SelectContent className="">
                              <SelectItem value="mercado">Mercado</SelectItem>
                              <SelectItem value="agua">Água</SelectItem>
                              <SelectItem value="horti-fruti">
                                Horti‑fruti
                              </SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Input para preço (string com vírgula) */}
              <FormField
                control={form.control}
                name={`items.${index}.price`}
                render={({ field: priceField, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        {...priceField}
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        onChange={(e) => {
                          const val = e.target.value;
                          // só chama onChange se o valor for válido
                          if (val === "" || numberCommaRegex.test(val)) {
                            priceField.onChange(val);
                          }
                        }}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="hover:cursor-pointer w-full"
            onClick={() => append({ title: "mercado", price: "" })}
          >
            Adicionar Item
          </Button>
        </div>

        <div className="w-full flex flex-col justify-between gap-4 text-center">
          <Button className="w-full hover:cursor-pointer" type="submit">
            Enviar
          </Button>
          <Link href="/registry/history" className="hover:cursor-pointer">
            Ver Registros
          </Link>
        </div>
      </form>
    </Form>
  );
}
