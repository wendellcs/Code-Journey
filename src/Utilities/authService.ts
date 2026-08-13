export const setAccessToken = (token:string) => localStorage.setItem('access_token', token)

export const getAccessToken = () => localStorage.getItem('access_token')

export const getAuthHeader = () => {
    const token = getAccessToken()

    return {
        headers: {
            Authorization: token
        }
    }
}