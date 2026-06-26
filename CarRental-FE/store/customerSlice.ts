import { fetchCustomers } from "@/constants/customerApi";
import { customerDataType } from "@/constants/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface customerState {
  customerData: customerDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: customerState = {
  customerData: [],
  loading: false,
  error: null,
};

export const fetchCustomersThunk = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCustomers();
      if (!response?.success)
        return thunkAPI.rejectWithValue(response?.message);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("API hatası meydana geldi");
    }
  },
);

const customerSlice = createSlice({
  name: "customerStoreData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //loading
      .addCase(fetchCustomersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //success
      .addCase(fetchCustomersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customerData = action.payload;
      })
      //error
      .addCase(fetchCustomersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
