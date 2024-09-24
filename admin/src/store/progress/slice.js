import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    progressList: [],
    totalList: [],
    mainPlantsList: [],
    subPlantsList: [],
    memoList: null
};

const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setProgressList: (state, action)=> {
            state.progressList = action.payload;
        },
        setTotalList: (state, action)=> {
            state.totalList = action.payload;
        },
        setMainPlantsList: (state, action)=> {
            state.mainPlantsList = action.payload;
        },
        setSubPlantsList: (state, action)=> {
            state.subPlantsList = action.payload;
        },
        setMemoList: (state, action)=> {
            state.memoList = action.payload.data;
        }
    }
});

export const {
    setProgressList,
    setTotalList,
    setMainPlantsList,
    setSubPlantsList,
    setMemoList
} = progressSlice.actions;

export default progressSlice.reducer;