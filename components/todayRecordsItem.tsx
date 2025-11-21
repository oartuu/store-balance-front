import React from 'react'
import { Item, ItemActions, ItemContent } from './ui/item';
import { ChevronRight } from 'lucide-react';


 interface TodayRecordsItemProps {
   recordsCount: number;
 }

export default function TodayRecordsItem({recordsCount}: TodayRecordsItemProps) {



  return (
    <Item
      variant={"outline"}
      className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
    >
      <ItemContent>{recordsCount > 1 ? `${recordsCount} Registros` : `${recordsCount} Registro`}</ItemContent>
      <ItemActions>
        <ChevronRight />
      </ItemActions>
    </Item>
  );
}
