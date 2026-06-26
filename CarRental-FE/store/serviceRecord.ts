import { createSlice } from "@reduxjs/toolkit";

const serviceRecordSlice = createSlice({
  name: "SCStoreData",
  initialState: {
    serviceRecordData: [
      {
        id: 0,
        vehicleId: 0,
        userId: 0,
        description: "",
        state: "",
        plannedEndDate: "",
        endDate: "",
        price: 0,
        createdTime: "",
      },
    ],
  },
  reducers: {
    setSCStoreData: (state, action) => {
      state.serviceRecordData = action.payload;
    },
  },
});

export const { setSCStoreData } = serviceRecordSlice.actions;
export default serviceRecordSlice.reducer;
