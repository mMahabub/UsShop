import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constant';
import { logout } from './authSlice';
import { data } from 'react-router-dom';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
        query: (data) => ({
            url:`${USERS_URL}`,
            method: 'POST',
            body: data,
        }),
    }),
    logout: builder.mutation({
        query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST'
        })
    })
})
})

export const {
    useLoginMutation,useLogoutMutation,useRegisterMutation
   
  } = userApiSlice;