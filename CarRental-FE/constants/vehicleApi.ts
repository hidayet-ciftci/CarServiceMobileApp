import Toast from "react-native-toast-message";
import axiosClient from "./axiosClient";
import { vehicleDataType } from "./types";

export const fetchVehicles = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Vehicles`;
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

export const createVehicle = async (vehicle: vehicleDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Vehicles`;
  const { id, ...restOfVehicle } = vehicle;

  try {
    const res = await axiosClient.post(url, restOfVehicle);
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

export const getVehicleById = async (vehicleId: string | string[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Vehicles/vehicle-detail/${vehicleId}`;
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

export const updateVehicles = async (vehicle: vehicleDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Vehicles`;
  try {
    const res = await axiosClient.put(url, vehicle);
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

export const deleteVehiclesByIds = async (vehicleIds: number[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Vehicles/delete-many`;
  try {
    const res = await axiosClient.delete(url, { data: vehicleIds });
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
