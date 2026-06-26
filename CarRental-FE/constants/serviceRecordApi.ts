import Toast from "react-native-toast-message";
import axiosClient from "./axiosClient";
import { SCDataType } from "./types";

export const fetchServiceRecords = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/ServiceRecords`;
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

export const createServiceRecord = async (SC: SCDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/ServiceRecords`;
  const { id, ...restOfServiceRecord } = SC;

  try {
    const res = await axiosClient.post(url, restOfServiceRecord);
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

export const getSCById = async (SCId: string | string[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/ServiceRecords/service-record-detail/${SCId}`;
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

export const updateServiceRecord = async (SC: SCDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/ServiceRecords`;
  try {
    const res = await axiosClient.put(url, SC);
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

export const deleteSCById = async (SCIds: number[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/ServiceRecords/delete-many`;
  try {
    const res = await axiosClient.delete(url, { data: SCIds });
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
