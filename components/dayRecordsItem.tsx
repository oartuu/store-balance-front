
import Link from 'next/link';
import { Item, ItemActions, ItemContent } from './ui/item';
import { ChevronRight } from 'lucide-react';


interface DayRecordsItemProps {
  recordsDate: string;
  date: string
}


export default function DayRecordsItem({recordsDate, date}: DayRecordsItemProps) {
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

  return (
    <Link href={`/registry/history/${extractDateOnly(date)}`}>
      <Item
        variant={"outline"}
        className="shadow-md dark:shadow-2xl hover:cursor-pointer"
      >
        <ItemContent>{`Vendas dia ${recordsDate}`}</ItemContent>
        <ItemActions>
          <ChevronRight />
        </ItemActions>
      </Item>
    </Link>
  );
}
