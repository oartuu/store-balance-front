import React from 'react'
import { Item, ItemActions, ItemContent } from './ui/item';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';


 interface TodayRecordsItemProps {
   recordsCount: number;
 }

export default function TodayRecordsItem({recordsCount}: TodayRecordsItemProps) {


  return (
    <Link href={`/registry/history/`}>
      <Item
        variant={"outline"}
        className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
      >
        <ItemContent>
          {recordsCount > 1
            ? `${recordsCount} Registros`
            : `${recordsCount} Registro`}
        </ItemContent>
        <ItemActions>
          <ChevronRight />
        </ItemActions>
      </Item>
    </Link>
  );
}
