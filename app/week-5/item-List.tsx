"use client";

import { useState } from "react";
import Item from "./item";
import items from "./item.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList() {
  const [listItems] = useState<ItemType[]>(items as ItemType[]);
  const [sortBy, setSortBy] = useState<string>("name");

  const sortedItems = [...listItems].sort((a, b) => {
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  const grouped = Object.entries(
    listItems.reduce<Record<string, ItemType[]>>((acc, it) => {
      const cat = it.category ?? "uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(it);
      return acc;
    }, {})
  )
    .map(([category, items]) => ({
      category,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy("name")}
          className={
            (sortBy === "name"
              ? "bg-slate-700 text-slate-100"
              : "bg-slate-800 text-slate-400") + " px-3 py-1 rounded"
          }
        >
          Sort by name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={
            (sortBy === "category"
              ? "bg-slate-700 text-slate-100"
              : "bg-slate-800 text-slate-400") + " px-3 py-1 rounded"
          }
        >
          Sort by category
        </button>

        <button
          onClick={() => setSortBy("group")}
          className={
            (sortBy === "group"
              ? "bg-slate-700 text-slate-100"
              : "bg-slate-800 text-slate-400") + " px-3 py-1 rounded"
          }
        >
          Group by category
        </button>
      </div>

      {sortBy === "group" ? (
        <div className="space-y-6">
          {grouped.map((g) => (
            <section key={g.category}>
              <h3 className="font-semibold capitalize">{g.category}</h3>
              <ul className="pl-4 mt-2 space-y-2">
                {g.items.map((it) => (
                  <Item
                    key={String(it.id)}
                    name={it.name}
                    quantity={it.quantity}
                    category={it.category}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {sortedItems.map((it) => (
            <Item
              key={String(it.id)}
              name={it.name}
              quantity={it.quantity}
              category={it.category}
            />
          ))}
        </ul>
      )}
    </>
  );
}
