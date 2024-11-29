/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";

const apiUrl =
  import.meta.env.NEXT_PUBLIC_API_URL || import.meta.env.VITE_PUBLIC_API_URL;

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

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  status: string;
  token: string;
  position: string;
  createdAt?: string;
  updatedAt?: string;
}

interface StoreState {
  // Menu Items displayed on page
  menuItems: MenuItem[];
  fetchMenuItems: () => Promise<void>;

  // User
  user: User;
  signupUser: (data: any) => Promise<void>;
  loginUser: (data: any) => Promise<void>;

  // Cart Management
  cartItems: CartItem[];
  addItemToCart: (item: MenuItem) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeItemFromCart: (itemId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;

  notification: string | null; // Add notification to the type
  setNotification: (message: string | null) => void; // Add setter for notification
}

// Create the store with type safety
const useStore = create<StoreState>((set, get) => ({
  menuItems: [],
  cartItems: [],
  notification: null,
  setNotification: (message) => set({ notification: message }),

  fetchMenuItems: async () => {
    const url = `${apiUrl}/api/menu/get`;
    const headers = {
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

  // User Object in store
  user: {
    id: "",
    username: "",
    email: "",
    status: "",
    token: "",
    position: "",
  },

  signupUser: async (data) => {
    const url = "/api/users/register";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      username: data.username,
      password: data.password,
      email: data.email,
      status: "active",
    };

    try {
      const response = await axios.post(url, body, { headers });
      set((state) => ({
        user: { ...state.user, ...response?.data?.data },
      }));
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  loginUser: async (data) => {
    const url =
      data.role === "customer"
        ? `${apiUrl}/api/users/login`
        : `${apiUrl}/api/employee/login`;
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      password: data.password,
      email: data.email,
    };

    try {
      const response = await axios.post(url, body, { headers });
      set((state) => ({
        user: { ...state.user, ...response?.data?.data },
      }));
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  // Cart State and Methods

  addItemToCart: (item) => {
    const existingItem = get().cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
        notification: `Updated quantity for ${item.name}`,
      }));
    } else {
      set((state) => ({
        cartItems: [
          ...state.cartItems,
          { id: item.id, name: item.name, quantity: 1, price: item.price },
        ],
        notification: `${item.name} added to cart`,
      }));
    }
  },

  updateCartItem: (itemId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      ),
    }));
  },

  removeItemFromCart: (itemId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.id !== itemId),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  checkout: async () => {
    const url = `${apiUrl}/api/orders/create`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
    };
    const body = {
      customer_id: get().user.id,
      items: get().cartItems.map((item) => ({
        item_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.quantity * item.price,
      })),
      total_amount: get().cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
    };

    try {
      await axios.post(url, body, { headers });
      get().clearCart(); // Clear cart after successful checkout
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  },
}));

export default useStore;
