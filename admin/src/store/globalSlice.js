import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isGLobalLoading: false,
    isAuthenticated: false,
    userData: null
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {                         
        setLoadingStatus: (state, action)=> {
            return {
                ...state,
                isGLobalLoading: action.payload
            }
        },
        setAuthStatus: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    }
});

export const { 
    setLoadingStatus,
    setAuthStatus,
    setUserData
} = globalSlice.actions;   

export default globalSlice.reducer;