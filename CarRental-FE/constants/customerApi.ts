import Toast from "react-native-toast-message";
import axiosClient from "./axiosClient";
import { customerDataType } from "./types";

export const fetchCustomers = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Customers`;
  try {
    const res = await axiosClient.get(url);
    const data = res.data;
    return data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      Toast.show({ type: "error", text1: error.response.data.message });
    } else {
      Toast.show({ type: "error", text1: error.message });
    }
  }
};

export const deleteByIdsCustomer = async (customerIds: number[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Customers/delete-many`;
  try {
    const res = await axiosClient.delete(url, { data: customerIds });
    const data = res.data;
    return data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      Toast.show({ type: "error", text1: error.response.data.message });
    } else {
      Toast.show({ type: "error", text1: error.message });
    }
  }
};

export const createCustomer = async (customer: customerDataType) => {
  const { id, ...restOfCustomer } = customer;
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Customers`;
  try {
    const res = await axiosClient.post(url, restOfCustomer);
    const data = res.data;
    return data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      Toast.show({ type: "error", text1: error.response.data.message });
    } else {
      Toast.show({ type: "error", text1: error.message });
    }
  }
};

export const getByIdCustomer = async (customerId: string | string[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Customers/customer-detail/${customerId}`;
  try {
    const res = await axiosClient.get(url);
    const data = res.data;
    return data;
  } catch (error: any) {
    // errorlar içten başlayıp , throw'landığı sürece yukarı doğru çıkar.
    // en üstte yaptığın alttakileri ezer.
    if (error?.response?.data?.message) {
      Toast.show({ type: "error", text1: error.response.data.message });
    } else {
      Toast.show({ type: "error", text1: error.message });
    }
  }
};

export const updateCustomer = async (customer: customerDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Customers`;
  try {
    const res = await axiosClient.put(url, customer);
    const data = res.data;
    return data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      Toast.show({ type: "error", text1: error.response.data.message });
    } else {
      Toast.show({ type: "error", text1: error.message });
    }
  }
};
