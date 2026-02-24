"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-List";
import itemsData from "./item.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  const handleAddItem = (newItem: Omit<ItemType, 'id'>) => {
    const itemWithId: ItemType = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems([...items, itemWithId]);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}