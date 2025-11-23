
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { RecordItem } from "@/lib/recordsTypes";

interface RecordsItemProps {
  title: string;
  type: string;
  items: RecordItem[];
  total: number;
}

export default function RecordsItem({ title,type, items, total }: RecordsItemProps) {

  

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
        <ItemTitle>{title }</ItemTitle>
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
