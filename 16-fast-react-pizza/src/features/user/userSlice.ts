import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAddress} from "../../services/apiGeocoding";

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    console.log(positionObj);
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const rawData = await getAddress(position);
    const addressObj = rawData.features[0].properties;
    const address = `${addressObj?.formatted}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.country}`;

    // 3) Then we return an object with the data that we are interested in
    return {position, address};
  }
);
interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  position: {latitude: number; longitude: number} | null;
  address: string;
  error: string | null;
}

const initialState: UserState = {
  username: "",
  status: "idle", // idle, loading, error
  position: null,
  address: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "error";
      });
  },
});
export const {updateName} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
