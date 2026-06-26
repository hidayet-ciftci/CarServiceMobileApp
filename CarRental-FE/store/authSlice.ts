import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: true, // uyg açılırken kontrol ediliyor
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login başarılı ise token'ı kaydet
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isLoading = false;
    },

    // logout veya refresh başarısız ise token'ı null yap ve yüklenme durumunu kapat.

    clearToken: (state) => {
      state.accessToken = null;
      state.isLoading = false;
    },
    // yüklenme durumunu belirle -> token kontrolü bittiğinde çağrılır
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setToken, clearToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
