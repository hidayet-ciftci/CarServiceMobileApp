import Toast from "react-native-toast-message";
import axiosClient from "./axiosClient";
import { registerUserDataType, userDataType } from "./types";

export const fetchUsers = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Users`;
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

export const createUser = async (user: registerUserDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Auth/register`;
  try {
    const res = await axiosClient.post(url, user);
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

export const getIdUser = async (userId: string | string[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Users/user-detail/${userId}`;
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

export const updateUser = async (user: userDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Users`;
  try {
    const res = await axiosClient.put(url, user);
    const data = res.data;
    return data;
  } catch (error: any) {
    // axiosClient içerisinde verilen throw error dışarıya buraya gelir.
    // burada ise eğer ki backendimizden data.message gönderildiyse onu gösteririz
    // gönderilmediyse throw ettiğimiz hatayı gösteririz
    // hata çeşitlerini handle etmeyi ise axiosClient içerisinde
    // if (error.response?.status == 404) { throw new Error("Bağlantı hatası"); }
    // şeklinde handle edip şekillendirebiliriz.
    if (error?.response?.data?.message) {
      Toast.show({ type: "error", text1: error.response.data.message });
    } else {
      Toast.show({ type: "error", text1: error.message });
    }
  }
};

export const deleteByIdUser = async (userIds: number[]) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Users/delete-many`;
  try {
    const res = await axiosClient.delete(url, { data: userIds });
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
