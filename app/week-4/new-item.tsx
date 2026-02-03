"use client";

import { useState } from "react";

export default function NewItem() {
	const [name, setName] = useState("");
	const [nameTouched, setNameTouched] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [category, setCategory] = useState("produce");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || name.length < 2) {
			setNameTouched(true);
			alert("Name must be at least 2 characters.");
			return;
		}

		const item = { name, quantity, category };
		console.log(item);

		alert(`Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

		setName("");
		setQuantity(1);
		setCategory("produce");
		setNameTouched(false);
	};

	return (
		<div className="max-w-md mx-auto mt-12 p-6 bg-white/80 backdrop-blur rounded-lg shadow-lg border border-gray-200">
			<h1 className="text-2xl font-semibold text-purple-700 mb-4">Add New Item</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setNameTouched(true)}
						placeholder="Enter item name"
						required
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
							nameTouched && !name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-yellow-300"
						}`}
					/>
					{(nameTouched && (!name || name.length < 2)) && (
						<p className="text-red-500 text-sm mt-1">Name must be at least 2 characters.</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
					<input
						type="number"
						min="1"
						max="99"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value) || 1)}
						required
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
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
				<div className="pt-2">
					<button
						type="submit"
						className="w-full py-2 rounded-md text-white font-medium bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:opacity-95 shadow"
					>
						Add Item
					</button>
				</div>
			</form>
			<div className="mt-4 text-sm text-gray-600">Preview: <span className="font-medium">{name || '—'}</span> • <span className="font-medium">{quantity}</span> • <span className="capitalize font-medium">{category.replace(/-/g, ' ')}</span></div>
		</div>
	);
}

