import { vehicleDataType } from "@/constants/types";
import { fetchVehicles } from "@/constants/vehicleApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface vehicleState {
  vehiclesData: vehicleDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: vehicleState = {
  vehiclesData: [],
  loading: false,
  error: null,
};

export const fetchVehiclesThunk = createAsyncThunk(
  "vehicles/fetchVehicles",
  async (_, thunkAPI) => {
    try {
      const response = await fetchVehicles();
      if (!response?.success) {
        return thunkAPI.rejectWithValue(response?.message);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("API hatası meydana geldi");
    }
  },
);

const vehicleSlice = createSlice({
  name: "vehicleStoreData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //loading state
      .addCase(fetchVehiclesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // success
      .addCase(fetchVehiclesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.vehiclesData = action.payload;
      })
      // error
      .addCase(fetchVehiclesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default vehicleSlice.reducer;
