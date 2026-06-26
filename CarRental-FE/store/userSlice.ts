import { userDataType } from "@/constants/types";
import { fetchUsers } from "@/constants/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
  userData: userDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  userData: [],
  loading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetchUsers();
      if (!response?.success)
        return thunkAPI.rejectWithValue(response?.message);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("API hatası meydana geldi");
    }
  },
);

const userSlice = createSlice({
  name: "userStoreData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //loading
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //success
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      //err
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
