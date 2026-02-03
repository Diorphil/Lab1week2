"use client";

import { useState } from "react";
import NewItem from "./new-item";

export default function Page() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h1>Week 4</h1>
			<p>Count: {count}</p>
            <button onClick={() => setCount((c) => c + 1)}>Increment</button>
            <NewItem />
		</div>
	);
}

