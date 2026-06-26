import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customerReducer from "./customerSlice";
import serviceRecordReducer from "./serviceRecord";
import uCustomerReducer from "./uCustomerSlice";
import userReducer from "./userSlice";
import vehicleReducer from "./vehicleSlice";

export const store = configureStore({
  reducer: {
    unloginCustomerData: uCustomerReducer,
    auth: authReducer,
    vehicleStoreData: vehicleReducer,
    userStoreData: userReducer,
    customerStoreData: customerReducer,
    ScStoreData: serviceRecordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
