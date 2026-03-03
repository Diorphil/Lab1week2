"use client";

import { useState } from "react";
import ItemList from "./item-List";
import NewItem from "./new-item";
import itemsData from "./item.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  const handleAddItem = (item: { name: string; quantity: number; category: string }) => {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}