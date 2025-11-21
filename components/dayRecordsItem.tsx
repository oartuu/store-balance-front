
import { Item, ItemActions, ItemContent } from './ui/item';
import { ChevronRight } from 'lucide-react';


interface DayRecordsItemProps {
  recordsDate: string;
}


export default function DayRecordsItem({recordsDate}: DayRecordsItemProps) {

  return (
    <Item
      variant={"outline"}
      className="shadow-md dark:shadow-2xl hover:cursor-pointer"
    >
      <ItemContent>{`Vendas dia ${recordsDate}`}</ItemContent>
      <ItemActions>
        <ChevronRight />
      </ItemActions>
    </Item>
  );
}
