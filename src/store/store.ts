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

interface Employee {
  id: string;
  email: string;
  username: string;
  name: string;
  position: string;
  salary: string;
  status: string;
  restaurant_id: string;
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

interface Supplier {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  payment_terms: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface InventoryTransactionItem {
  transaction_id: string;
  inventory_id: string;
  kitchen_id: string;
  type: string;
  quantity: string;
  transaction_date: string;
  recorded_by: string;
  notes: string;
}

interface OrderDetail {
  id: string;
  customer_id: string;
  restaurant_id: string;
  status: string;
  total_amount: string;
  payment_status: "";
  created_at: string;
  updated_at: string;
}

interface StoreState {
  // Cart Management
  cartItems: CartItem[];
  addItemToCart: (item: MenuItem) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeItemFromCart: (itemId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  notification: string | null;
  setNotification: (message: string | null) => void;
  menuItems: MenuItem[];
  fetchMenuItems: () => Promise<void>;
  user: User;
  signupUser: (data: any) => Promise<void>;
  loginUser: (data: any) => Promise<void>;
  logoutUser: () => void;
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
  restMetricsExecAll: RestaurantMetrics[];
  fetchRestMetricsAllExec: () => Promise<void>;
  kitchenList: KitchenDetail[];
  fetchKitchenList: () => Promise<void>;
  kitchenDetail: KitchenDetail[];
  fetchSingleKitchenDetail: (id: string) => Promise<void>;
  createdMenuItem: MenuItem[];
  creatingMenuItemByManager: (data: any) => Promise<void>;
  allEmployees: Employee[];
  fetchAllEmployees: () => Promise<void>;
  createdEmployee: Employee[];
  creatingEmployeeByManager: (data: any) => Promise<void>;
  suppliers: Supplier[];
  fetchSupplierList: () => Promise<void>;
  createdSupplier: Supplier[];
  createSupplier: (data: any) => Promise<void>;
  inventoryTransactions: InventoryTransactionItem[];
  fetchInventoryTransactions: () => Promise<void>;
  currentOrder: OrderDetail[];
  fetchCurrentOrder: () => Promise<void>;
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
    const url = `${apiUrl}/api/users/register`;
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
      console.log("REsponse >>> ", response);

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

  logoutUser: () => {
    set({
      user: {
        email: "",
        id: "",
        position: "",
        status: "",
        token: "",
        username: "",
        createdAt: "",
        name: "",
        updatedAt: "",
      },
    });
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
      console.error("Checkout failed:", error);
    }
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

  restMetricsExecAll: [],

  fetchRestMetricsAllExec: async () => {
    const url = `${apiUrl}/api/v1/internal/executive/restaurantMetrics`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({
        restMetricsExecAll: response?.data?.data?.restaurantMetrics || [],
      });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  kitchenList: [],

  fetchKitchenList: async () => {
    const url =
      get().user.position === "MANAGER"
        ? `${apiUrl}/api/v1/internal/manager/kitchen`
        : get().user.position === "EXECUTIVE"
        ? `${apiUrl}/api/v1/internal/executive/kitchen`
        : `${apiUrl}/api/v1/internal/kitchenStaff/kitchen`;
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
      get().fetchMenuItems();
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  allEmployees: [],

  fetchAllEmployees: async () => {
    const url = `${apiUrl}/api/employee/get/employees`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ allEmployees: response?.data?.data || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  createdEmployee: [],

  creatingEmployeeByManager: async (data) => {
    const url = `${apiUrl}/api/employee/create`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      position: data.position,
      hire_date: "2024-11-18 14:44:43",
      salary: data.salary,
      status: data.status,
    };

    try {
      const response = await axios.post(url, body, { headers });
      set({
        createdEmployee: [response?.data?.data],
      });
      get().fetchAllEmployees();
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  suppliers: [],

  fetchSupplierList: async () => {
    const url =
      get().user.position === "EXECUTIVE"
        ? `${apiUrl}/api/v1/internal/executive/supplier`
        : `${apiUrl}/api/v1/internal/kitchenStaff/supplier`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({ suppliers: response?.data?.data?.suppliers || [] });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  createdSupplier: [],

  createSupplier: async (data) => {
    const url =
      get().user.position === "EXECUTIVE"
        ? `${apiUrl}/api/v1/internal/executive/supplier`
        : `${apiUrl}/api/v1/internal/kitchenStaff/supplier`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      name: data.name,
      contact_person: data.contact_person,
      email: data.email,
      phone: data.phone,
      address: data.address,
      payment_terms: data.payment_terms,
      status: data.status,
    };

    try {
      const response = await axios.post(url, body, { headers });
      set({
        createdEmployee: [response?.data?.data],
      });
      get().fetchSupplierList();
    } catch (error) {
      console.error("Error from API: ", error);
    }
  },

  inventoryTransactions: [],

  fetchInventoryTransactions: async () => {
    const url =
      get().user.position === "EXECUTIVE"
        ? `${apiUrl}/api/v1/internal/executive/inventoryTransactions`
        : `${apiUrl}/api/v1/internal/kitchenStaff/inventoryTransactions`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
      set({
        inventoryTransactions:
          response?.data?.data?.inventoryTransactions || [],
      });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },

  currentOrder: [],

  fetchCurrentOrder: async () => {
    const url = `${apiUrl}/api/orders/orders`;
    const headers = {
      Authorization: `Bearer ${get().user.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.get(url, { headers });
     set({
        currentOrder: response?.data?.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  },
}));

export default useStore;
