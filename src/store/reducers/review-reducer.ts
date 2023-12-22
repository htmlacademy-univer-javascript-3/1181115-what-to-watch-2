import { createReducer } from '@reduxjs/toolkit';
import { loadComments } from '../action';
import { UserComment } from '../../types';


export type StateType = {
  userComments: UserComment[];
  isCommentsLoading: boolean;
};

const initialState: StateType = {
  userComments: [],
  isCommentsLoading: false,
};

const reviewReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(loadComments, (state, action) => {
      state.userComments = action.payload;
    });
});

export {reviewReducer};
