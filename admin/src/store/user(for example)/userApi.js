import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define an API service with RTK Query

/** ----------------------------------------
 * 
 * builder.query(): GET methohd, builder.mutaion(): POST, PUT, DELETE method 
 * 
 *  */ 
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    
    tagTypes: ['User'],

    endpoints: (builder) => ({
        // 🔹 Get all users
        getUsers: builder.query({
            query: () => 'users',      // https://jsonplaceholder.typicode.com/users  'GET'
            providesTags: (result) => 
                result ? 
                [...result.map(({ id }) => ({ type: 'User', id })), { type: 'User', id: 'LIST' }]
                : 
                [{ type: 'User', id: 'LIST' }],
        }),

        // 🔹 Get single user
        getUserById: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id)=> [{type: 'User', id}]
        }),

        // 🔹 Create new user
        creatUser: builder.mutation({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST'}]
        }),

        // 🔹 Update user
        updateUser: builder.mutation({
            query: (id, ...patch)=> ({
                url: `users/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: (result, error, {id})=> [{type: 'User', id}],
        }),

        // 🔹 Delete user
        deleteUser: builder.mutation({
            query: (id)=> ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id}, {type: 'User', id: 'LIST'}]
        })
    }),
});

export const { 
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreatUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi; // Auto-generated hook