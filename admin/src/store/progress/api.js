import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const progressApi = createApi({
    reducerPath: 'progressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:3000/api/admin/'
    }),
    tagTypes: ['Progress'],

    endpoints: (builder) => ({
        getProgress: builder.query({
            query: () => 'progress',
            
            providesTags: (result)=>
                result.status ? 
                [...result.data.map(({ id }) => ({ type: 'Progress', id })), { type: 'Progress', id: 'LIST' }]
                : 
                [{ type: 'Progress', id: 'LIST' }],
        }),
        
        getArchive: builder.query({
            query: ()=> 'archivementTarget',
            providesTags: (result)=>
                result.status ? 
                [...result.data.map(({ id }) => ({ type: 'archivementTarget', id })), { type: 'archivementTarget', id: 'LIST' }]
                : 
                [{ type: 'archivementTarget', id: 'LIST' }],
        }),

        getTotal: builder.query({
            query: ()=> 'total',
            providesTags: ['total'],  // point A(1): after update and then automoatical call useGetTotalQUery
        }),
        
        getMainPlants: builder.query({
            query: ()=> 'mainPlants',
            providesTags: ['mainPlants']
                
        }),

        getSubPlants: builder.query({
            query: ()=> 'subPlants',
            providesTags: ['subPlants']
        }),

        updateProgress: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `progress/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: (result, error, {id})=> [{type: 'Progress', id}]
        }),

        updateReason: builder.mutation(
            {
                query: ({id, ...patch}) => {
                    console.log('query id:', id);
                    console.log('query patch:', patch);
                    return {
                        url: `reason/${id}`,
                        method: "PUT",
                        body: patch
                    }
                },
                invalidatesTags: ['total']    // point A(2): after update and then automoatical call useGetTotalQUery
            }
        ),
        updateStatus: builder.mutation(
            {
                query: ({id, ...patch}) => {
                    return {
                        url: `status/${id}`,
                        method: "PUT",
                        body: patch
                    }
                },
                invalidatesTags: ['total', 'mainPlants', 'subPlants']    // point A(2): after update and then automoatical call useGetTotalQUery
            }
        ),
        // 🔹 Create new Memo
        createMemo: builder.mutation({
            query: (newUser) => ({
                url: 'memo',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['memo']
        }), 
        // 🔹 Get new memo
        getMemo: builder.query({
            query: ()=> 'memo',
            providesTags: ['memo']
        }),
        // 🔹 update new memo
        updateMemo:  builder.mutation(
            {
                query: ({id, ...patch}) => {
                    return {
                        url: `memo/${id}`,
                        method: "PUT",
                        body: patch
                    }
                },
                invalidatesTags: ['memo']    // point A(2): after update and then automoatical call useGetTotalQUery
            }
        ),
        // 🔹 update new description
        updateTodayMemo: builder.mutation(
            {
                query: ({id, ...patch}) => {
                    return {
                        url: `todayMemo/${id}`,
                        method: 'PUT',
                        body: patch
                    }
                },
                invalidatesTags: ['total']
            }
        )
    })
});

/* update or delete action just automatial call useGetQuery with RTK Query main function  */

export const {
    useGetProgressQuery,
    useGetArchiveQuery,
    useGetTotalQuery,
    useGetMainPlantsQuery,
    useGetSubPlantsQuery,
    useUpdateProgressMutation,
    useUpdateReasonMutation,
    useUpdateStatusMutation,
    useGetMemoQuery,
    useUpdateMemoMutation,
    useCreateMemoMutation,
    useUpdateTodayMemoMutation
} = progressApi;

