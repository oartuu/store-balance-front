import React from 'react'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from './ui/item';
import { ChevronRight } from 'lucide-react';


interface EmployeeItemProps {
  name: string;
  role: boolean;
}

export default function EmployeeItem({
  name,
  role
}: EmployeeItemProps) {
  return (
    <Item
      variant={"outline"}
      className=" shadow-md dark:shadow-2xl hover:cursor-pointer"
    >
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="flex flex-col ">
          <span>{`Cargo: ${role ? "Administrador" : "Funcionário"}`}</span>
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        <ChevronRight />
      </ItemActions>
    </Item>
  );
}


