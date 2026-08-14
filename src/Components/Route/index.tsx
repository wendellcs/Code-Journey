import { Navigate, useNavigate } from "react-router-dom"
import { getAccessToken } from "../../Utilities/authService"
import axios from "axios"
import { getAuthHeader } from "../../Utilities/authService"
import { useEffect } from "react"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const token = getAccessToken()

    if (!token) {
        return <Navigate to='/login' replace />
    }

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/general/validate_token`, getAuthHeader())
            } catch (e) {
                navigate('/login')
                console.error(e)
                alert('Token inválido')
            }
        }

        verifyToken()
    }, [token])

    return <>{children}</>
}