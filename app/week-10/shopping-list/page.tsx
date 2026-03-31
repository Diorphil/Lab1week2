"use client";

import { useState, useEffect, useCallback } from "react";
import ItemList from "./item-List";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { getItems, addItem } from "../_services/shopping-list-services";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const router = useRouter();
  const auth = useUserAuth();
  const user = auth?.user;

  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  const loadItems = useCallback(async () => {
    if (user) {
      const firebaseItems = await getItems(user.uid);
      setItems(firebaseItems as ItemType[]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    } else {
      loadItems();
    }
  }, [user, router, loadItems]);

  const handleAddItem = async (item: {
    name: string;
    quantity: number;
    category: string;
  }) => {
   if (!user) return;
    const id = await addItem(user.uid, item);
    const newItem: ItemType = { id: String(id), ...item };
    setItems((prev) => [...prev, newItem]);
  };

  const handleItemSelect = (item: ItemType) => {
    const cleanName = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
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
          {selectedItemName ? (
            <MealIdeas ingredient={selectedItemName} />
          ) : (
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-600 italic">
                Select an item from the list to see meal ideas.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}