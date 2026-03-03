"use client";

import { useState } from "react";
import ItemList from "./item-List";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./item.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  const handleAddItem = (item: { name: string; quantity: number; category: string }) => {
    const newItem: ItemType = { id: crypto.randomUUID(), ...item };
    setItems((prev) => [...prev, newItem]);
  };

  const handleItemSelect = (item: ItemType) => {
    const cleanName = item.name
      .split(",")[0]
      .trim()
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "")
      .trim();
    setSelectedItemName(cleanName);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <div className="flex gap-8">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}