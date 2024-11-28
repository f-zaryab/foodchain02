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

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  status: string;
  token: string;
  // position: typeof userTypes;
  position: string;
  createdAt?: string;
  updatedAt?: string;
}

interface RestaurantMetrics {
  id: string;
  restaurant_id: string;
  date?: string;
  total_orders_completed: string;
  created_at: string;
  daily_revenue: string;
  average_order_value: string;
}

interface KitchenDetail {
  kitchen_id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  manager_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface StoreState {
  menuItems: MenuItem[];
  fetchMenuItems: () => Promise<void>;
  user: User;
  signupUser: (data: any) => Promise<void>;
  loginUser: (data: any) => Promise<void>;
  employeeDetail: {
    id: string;
    name: string;
    restaurant_id: string;
    position: string;
    hireDate: string;
    salary: string;
    status: string;
    email: string;
  };
  fetchEmployeeDetail: () => Promise<void>;
  restMetrics: RestaurantMetrics[];
  fetchRestMetrics: (id: string) => Promise<void>;
  kitchenList: KitchenDetail[];
  fetchKitchenList: () => Promise<void>;
  kitchenDetail: KitchenDetail[];
  fetchSingleKitchenDetail: (id: string) => Promise<void>;
  createdMenuItem: MenuItem[];
  creatingMenuItemByManager: (data: any) => Promise<void>;

  // cartItems: string[];
  // addItemToCart: (item: string) => void;
  // removeItemFromCart: (index: number) => void;
  // updateItemToCart: (index: number, newItem: string) => void;
}

// Create the store with type safety
const useStore = create<StoreState>((set, get) => ({
  menuItems: [],

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
    // position: [userTypes[1]],
    position: "",
  },

  signupUser: async (data) => {
    const url = "/api/users/register";
    const headers = {
      // Authorization: "Bearer YOUR_ACCESS_TOKEN",
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
      // set({ user: response?.data?.data || [] });
      set((state) => ({
        user: { ...state.user, ...response?.data?.data }, // Update user immutably
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
      // Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      password: data.password,
      email: data.email,
    };

    try {
      const response = await axios.post(url, body, { headers });
      // set({ user: response?.data?.data || [] });
      set((state) => ({
        user: { ...state.user, ...response?.data?.data }, // Update user immutably
      }));
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  employeeDetail: {
    email: "",
    hireDate: "",
    id: "",
    name: "",
    position: "",
    restaurant_id: "",
    salary: "",
    status: "",
  },

  fetchEmployeeDetail: async () => {
    const url = `${apiUrl}/api/employee/get`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ employeeDetail: response?.data?.data || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  restMetrics: [],

  fetchRestMetrics: async (id: string) => {
    const url = `${apiUrl}/api/v1/internal/manager/restaurantMetrics/${id}`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ restMetrics: response?.data?.data || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  kitchenList: [],

  fetchKitchenList: async () => {
    const url = `${apiUrl}/api/v1/internal/manager/kitchen`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ kitchenList: response?.data?.data?.kitchens || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  kitchenDetail: [],

  fetchSingleKitchenDetail: async (id: string) => {
    const url = `${apiUrl}/api/v1/internal/manager/kitchen/${id}`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ kitchenDetail: response?.data?.data || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  createdMenuItem: [],

  creatingMenuItemByManager: async (data) => {
    const url = `${apiUrl}/api/menu/create`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      preparation_time: data.preparation_time,
      calories: data.calories,
      allergens: data.allergens,
      status: data.status,
      is_featured: data.is_featured,
    };

    try {
      const response = await axios.post(url, body, { headers });
      set({
        createdMenuItem: [response?.data?.data],
      });
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  // TOBE: Added later below -----------------------------------------------------------------------------------
  //   addMenutoStore: (item) =>
  //     set((state) => ({
  //       menuItems: [...state.cartItems, item],
  //     })),
  // cartItems: [],
  // //   Adding items to the cart
  // addItemToCart: (item) =>
  //   set((state) => ({
  //     cartItems: [...state.cartItems, item],
  //   })),
  // // Removing Items from the cart
  // removeItemFromCart: (index) =>
  //   set((state) => ({
  //     cartItems: state.cartItems.filter((_, i) => i !== index),
  //   })),
  // // Updating items in the car
  // updateItemToCart: (index, newItem) =>
  //   set((state) => ({
  //     cartItems: state.cartItems.map((item, i) =>
  //       i === index ? newItem : item
  //     ),
  //   })),
}));

export default useStore;
