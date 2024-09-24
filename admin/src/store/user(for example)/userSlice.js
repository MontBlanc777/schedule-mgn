import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  schedule: null,
  isAuthenticatd: false,
};

/** 
 * createSlice() = createReducer() + createAction() : reducer + action 
*/

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {                         // reducer + actions
    setUsername: (state, action) => {
      state.username = action.payload;
    },

    addUser: {
        reducer: (state, action) => {
            state.users.push(action.payload)
        },
        prepare: (user) => {
            return {
                payload: {
                    id: nanoid(),
                    ...user
                }
            }
        }
    },

    clearUserData: (state)=> {
        state.username = null
    }

  },
});

export const { 
    setUsername ,
    adduser,
    clearUserData
} = userSlice.actions;   

export default userSlice.reducer;