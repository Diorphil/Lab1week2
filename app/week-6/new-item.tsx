"use client";

import { useState } from "react";

type NewItemProps = {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
};

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [nameHasInvalidChars, setNameHasInvalidChars] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const hasInvalidChars = /[^a-zA-Z\s]/.test(value);
    setNameHasInvalidChars(hasInvalidChars);
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || name.length < 2 || nameHasInvalidChars) {
      setNameTouched(true);
      return;
    }

    const item = { name, quantity, category };
    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
    setNameHasInvalidChars(false);
  };

  const isInvalid = (nameTouched && name.length < 2) || nameHasInvalidChars;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Add New Item</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex items-stretch gap-0 rounded-xl overflow-hidden border-2 border-gray-300 shadow-sm bg-white focus-within:border-purple-400 transition-colors">

          {/* Name */}
          <div className="flex flex-col flex-1 border-r border-gray-300">
            <label className="text-xs font-semibold text-gray-500 px-3 pt-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={() => setNameTouched(true)}
              placeholder="e.g. Apples"
              className="px-3 pb-2 text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
            {isInvalid && (
              <p className="text-red-500 text-xs px-3 pb-1">
                {nameHasInvalidChars ? "Letters only." : "Min 2 characters."}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col w-20 border-r border-gray-300">
            <label className="text-xs font-semibold text-gray-500 px-3 pt-2">Qty</label>
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="px-3 pb-2 text-sm bg-transparent focus:outline-none text-gray-800 w-full"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col flex-1 border-r border-gray-300">
            <label className="text-xs font-semibold text-gray-500 px-3 pt-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 pb-2 text-sm bg-transparent focus:outline-none text-gray-800 capitalize"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen-foods">Frozen Foods</option>
              <option value="canned-goods">Canned Goods</option>
              <option value="dry-goods">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            type="submit"
            disabled={!name || name.length < 2 || nameHasInvalidChars}
            className="px-5 font-semibold text-white bg-gradient-to-br from-blue-600 to-lightblue-500 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}