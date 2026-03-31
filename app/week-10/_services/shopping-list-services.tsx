import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Type for an item
export type Item = {
  id?: string;
  name: string;
  quantity: number;
  category: string;
};

/**
 * Get all items for a specific user
 */
export async function getItems(userId: string): Promise<Item[]> {
  try {
    // Reference to: users/{userId}/items
    const itemsCol = collection(db, "users", userId, "items");

    const snapshot = await getDocs(itemsCol);

    const items: Item[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Item, "id">),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Add a new item for a specific user
 */
export async function addItem(
  userId: string,
  item: Omit<Item, "id">
): Promise<string> {
  try {
    // Reference to: users/{userId}/items
    const itemsCol = collection(db, "users", userId, "items");

    const docRef = await addDoc(itemsCol, item);

    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}