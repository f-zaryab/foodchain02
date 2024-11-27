import { create } from "zustand";
import axios from "axios";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  calories?: number;
  allergens?: string;
  status?: string;
  is_featured?: number;
  preparation_time?: string;
}

interface StoreState {
  menuItems: MenuItem[];
  fetchMenuItems: () => Promise<void>;

  cartItems: string[];
  addItemToCart: (item: string) => void;
  removeItemFromCart: (index: number) => void;
  updateItemToCart: (index: number, newItem: string) => void;
}

// Create the store with type safety
const useStore = create<StoreState>((set) => ({
  menuItems: [],

  fetchMenuItems: async () => {
    const url = "/api/menu/get";
    const headers = {
      // Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ menuItems: response?.data?.data || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  //   addMenutoStore: (item) =>
  //     set((state) => ({
  //       menuItems: [...state.cartItems, item],
  //     })),

  cartItems: [],

  //   Adding items to the cart
  addItemToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  // Removing Items from the cart
  removeItemFromCart: (index) =>
    set((state) => ({
      cartItems: state.cartItems.filter((_, i) => i !== index),
    })),

  // Updating items in the car
  updateItemToCart: (index, newItem) =>
    set((state) => ({
      cartItems: state.cartItems.map((item, i) =>
        i === index ? newItem : item
      ),
    })),
}));

export default useStore;
