import clsx from "clsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Login = () => {
    const [onFocus, setOnFocus] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')

    const navigate = useNavigate()

    const handleToken = () => {
        if (token){
            localStorage.setItem('access_token', token)
            navigate('/dashboard')
        }
    }

    return (
        <main className="min-h-[calc(100vh-312px)] flex justify-center items-center">
            <div className="flex flex-col text-center gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10">
                <label htmlFor="token" className="mb-5">Insira o token de acesso</label>
                <div className={
                    clsx("relative rounded-lg p-0.5 overflow-hidden max-w-100 mx-auto w-full",
                        !onFocus && 'bg-secondary-gradient w-full max-w-100 p-0.5 rounded-lg h-11')}>

                    <div className={
                        clsx("absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#a855f7_80%,transparent_30%)] animate-rotate-border",
                            !onFocus && 'hidden')}></div>
                    <input
                        type="password"
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Token"
                        className="relative w-full bg-[#0a0a1a] rounded-lg px-4 py-2 text-white placeholder:text-gray-500"
                        onFocus={() => setOnFocus(true)}
                        onBlur={() => setOnFocus(false)}
                    />
                </div>
                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg border border-purple-900 hover:bg-input/50" onClick={handleToken}>Entrar</button>
            </div>
        </main>
    )
}