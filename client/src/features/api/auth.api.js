
/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const loginUser = (builder) => builder
    .mutation({
        query: (loginData) => ({
            url: '/auth/login',
            method: "POST",
            body: loginData
        }),
        providesTags: [{ type: "Auth", id: "login" }],
        transformResponse: (response) => response.user,
        transformErrorResponse: (response) => response.data,
    })


/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const registerUser = (builder) => builder
    .mutation({
        query: (registerData) => ({
            url: '/auth/register',
            method: "POST",
            body: registerData,
        }),
        providesTags: [{ type: "Auth", id: "register" }],
        transformResponse: (response) => response,
        transformErrorResponse: (response) => response.data,
    })


/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const logoutUser = (builder) => builder
    .query({
        query: () => ({
            url: '/auth/login',
            method: "GET"
        }),
        transformErrorResponse: (response) => response.data,
        providesTags: [{ type: "Auth", id: "logout" }],
        invalidatesTags: ["Auth", "Users", "Messages"]
    })

/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const verifyToken = (builder) => builder
    .query({
        query: () => ({
            url: '/auth/verify-token',
            method: "GET",
        }),
        providesTags: [{ type: "Auth", id: "verify-token" }],
        invalidatesTags: (response, error) => {
            if (error) {
                return ["Auth", "Users", "Messages"]
            }
        }
    })

// TODO idea to ask user to login/ re-verify their token after around 58 minutes