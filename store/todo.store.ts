import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Item {
  id: number;
  name: string;
  completed: boolean; 
}

interface StoreState {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (index: number, newItem: Item) => void;
  removeItem: (index: number) => void;

}

// Initialize the local storage key
const STORAGE_KEY = 'zustand_todo_items';

export const useStore = create<StoreState>()(persist(
  (set) => ({
    items: [],
loading: true,
    addItem: (item) =>
     set((state) => ({
        items: [...state.items, { ...item, id: Date.now(), completed: false }],
      })),
    updateItem: (index, newItem) =>
      set((state) => ({
        items: state.items.map((item, i) => (i === index ? newItem : item)),
        
      })),
    removeItem: (index) =>
      set((state) => ({
        items: state.items.filter((_, i) => i !== index),
     
      })),
  }),
  {
    name: STORAGE_KEY, // Specify the local storage key
    getStorage: () => localStorage, // Use localStorage for persistence
  }
));
