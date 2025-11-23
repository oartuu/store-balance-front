
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { RecordItem } from "@/lib/recordsTypes";

interface RecordsItemProps {
  type: string;
  items: RecordItem[];
  total: number;
}

export default function RecordsItem({ type, items, total }: RecordsItemProps) {

  function extractDateOnly(isoString: string): string {
    // Cria um objeto Date a partir da string ISO
    const date = new Date(isoString);

    // Pega ano, mês e dia
    const year = date.getFullYear();
    // getMonth retorna de 0 a 11, então +1
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Retorna no formato YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  function formatCurrencyBR(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  return (
    <Item
      variant={"outline"}
      className={
        type === "SALE"
          ? "shadow-md dark:shadow-2xl border-green-300 "
          : "shadow-md dark:shadow-2xl border-red-300 "
      }
    >
      <ItemContent>
        <ItemTitle>{type === "SALE" ? "Venda" : "Retirada"}</ItemTitle>
        <ul className="list-disc p-4">
          {items.map((item) => (
            <li key={item.id}>{`${item.title}: ${formatCurrencyBR(
              item.price
            )}`}</li>
          ))}
        </ul>
        <span className="">{`TOTAL: ${formatCurrencyBR(total)}`}</span>
      </ItemContent>
    </Item>
  );
}
