import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const API_PATHS = {
  USER: {
    ADD_USER: "api/users/add",
    GET_USERS: `api/users/all-users`,
    UPDATE_USER: (userId) => `api/users/update/${userId}`,
    DELETE_USER: (userId) => `api/users/delete/${userId}`,
  },
  CATEGORY: {
    ADD_CATEGORY: "api/categories/add",
    GET_CATEGORIES: "api/categories/all-categories",
    UPDATE_CATEGORY: (categoryId) => `api/categories/update/${categoryId}`,
    DELETE_CATEGORY: (categoryId) => `api/categories/delete/${categoryId}`,
  },
  PRODUCT: {
    ADD_PRODUCT: "api/products/add",
    GET_PRODUCTS: "api/products/all-products",
    UPDATE_PRODUCT: (productId) => `api/products/update/${productId}`,
    DELETE_PRODUCT: (productId) => `api/products/delete/${productId}`,
  },
  ORDER: {
    ADD_ORDER: "api/orders/add",
    GET_ORDERS: "api/orders/all-orders",
    UPDATE_ORDER: (orderId) => `api/orders/update-status/${orderId}`,
    CANCEL_ORDER: (orderId) => `api/orders/cancel/${orderId}`,
  },
  DASHBOARD: "/api/dashboard"
};

export default axiosInstance;