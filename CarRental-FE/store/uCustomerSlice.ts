import { createSlice } from "@reduxjs/toolkit";

const uCustomerSlice = createSlice({
  name: "unloginCustomerData",
  initialState: {
    CustomerData: [
      {
        address: "",
        brand: "",
        color: "",
        viN_Number: "",
        description: "",
        email: "",
        employer_Name: "",
        fullName: "",
        phoneNumber: "",
        plate: "",
        state: "",
        price: null,
        plannedEndDate: "",
        endDate: "",
        createdTime: "",
      },
    ],
  },
  reducers: {
    setData: (state, action) => {
      state.CustomerData = action.payload;
    },
  },
});

export const { setData } = uCustomerSlice.actions;
export default uCustomerSlice.reducer;
