import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddCommentRequest, AsyncActionConfig, UserComment } from '../../types';
import { APIRoute } from '../../const';


export const addCommentAction = createAsyncThunk <UserComment, AddCommentRequest, AsyncActionConfig>(
  'film/addComment',
  async({filmId, comment, rating}, { extra: api}) => {
    const response = await api.post<UserComment>(APIRoute.UserComments.replace(':id', filmId), {comment, rating});
    return response.data;
  },
);

export const fetchUsersCommentsAction = createAsyncThunk <UserComment[], string, AsyncActionConfig >(
  'film/fetchUsersComments',
  async(id, { extra: api }) => {
    const {data} = await api.get<UserComment[]>(APIRoute.UserComments.replace(':id', id));

    return data;
  },
);
