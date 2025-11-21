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

// Regex para permitir apenas dígitos e vírgula
const numberCommaRegex = /^\d*(,\d*)*$/;

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.enum(["SALE", "WITHDRAWAL"], "Tipo inválido"),
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
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "SALE",
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

  const onSubmit = async (data: FormSchema) => {
    // Converte a string price (ex: "12,34") para número (12.34)
    const formattedItems = data.items.map((item) => ({
      ...item,
      price: parseFloat(item.price.replace(/,/g, ".")),
    }));

    console.log("Dados enviados:", {
      title: data.title,
      type: data.type,
      items: formattedItems,
    });
    const formatData = {
      title: data.title,
      type: data.type,
      items: formattedItems,
    };
    try{
        const response = await createRecord(formatData);
    }catch (error){
        console.log(error)
    }finally{
        window.location.reload();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Título principal */}
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Venda(4)" />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Tipo (Select: Venda / Retirada) */}
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
                      <SelectTrigger className="w-full" aria-invalid={!!fieldState.error}>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SALE">Venda</SelectItem>
                        <SelectItem value="WITHDRAWAL">Retirada</SelectItem>
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
                            <SelectTrigger className="w-full" aria-invalid={!!fieldState.error}>
                              <SelectValue  placeholder="Selecione item" />
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

              {/* <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="mt-5"
              >
                Remover
              </Button> */}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ title: "mercado", price: "" })}
          >
            Adicionar Item
          </Button>
        </div>

        <Button className="w-full" type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
