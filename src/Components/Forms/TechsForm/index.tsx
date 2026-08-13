
import { useState } from "react"
import axios from "axios"
import { getAuthHeader } from "../../../Utilities/authService"

export const TechsForm = () => {
    const [techName, setTechName] = useState<string>('')
    const [techIcon, setTechIcon] = useState<string>('')

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!techName || !techIcon){
            alert('Não deixe campos vazios')
            return 
        }

        const regex = /[^\s\p{L}]/u
        const regexNoWhiteSpace = /[^\p{L}]/u

        if (regex.test(techName)){
            alert('Não insira números ou símbolos')
            return
        } else if (regexNoWhiteSpace.test(techIcon)){
            alert('Não insira números, símbolos ou espaços.')
        }

        const techData = {
            name: techName.trim(),
            course_id: null,
            tech_icon: techIcon.trim()
        }

        try {
            await axios.post('http://127.0.0.1:8000/techs/add', techData, getAuthHeader())
            alert('Tech registrada com sucesso!')
        } catch (e){
            console.error(e)
        }
    }

    return (
        <div>
            <h2 className="mb-25 text-2xl max-2xl:mt-25">Cadastrar Tecnologia</h2>

            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10" onSubmit={(e) => { handleSubmit(e) }}>
                <div>
                    <label htmlFor="tech">Tech</label>
                    <input onChange={(e) => setTechName(e.target.value)} value={techName} type="text" id="tech" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Tech" />
                </div>

                <div>
                    <label htmlFor="tech-icon">Ícone da Tech ( Estilo react-icons/si )</label>
                    <input onChange={(e) => setTechIcon(e.target.value)} value={techIcon} type="text" id="tech-icon" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Ícone" />
                </div>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>
        </div>
    )
}