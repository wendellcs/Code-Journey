import { StudentForm } from "../../Components/Forms/StudentForm"
import { StudentSkillsForm } from "../../Components/Forms/StudentSkillsForm"
import { ClassForm } from "../../Components/Forms/ClassForm"
import { TechsForm } from "../../Components/Forms/TechsForm"
import { TableStudents } from "../../Components/Tables/TableStudents"
import { TableTechs } from "../../Components/Tables/TableTechs"
import { TableClasses } from "../../Components/Tables/TableClasses"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }
    return (
        <main className="text-center py-15 px-5 relative overflow-clip bg-main-aurora max-md:px-0">
            <nav>
                <a href="#"></a>
            </nav>

            <h1 className="mt-25 mb-20 text-3xl">Dashboard</h1>

            <section className="grid grid-cols-2 max-w-380 mx-auto items-start gap-10 max-2xl:grid-cols-1">
                <ClassForm />

                <StudentForm />

                <TechsForm />

                <StudentSkillsForm/>
            </section>
            <section>
                <h2 className="mt-25 mb-20 text-2xl">Alunos registrados</h2>

                <TableStudents />

                <h2 className="mt-25 mb-20 text-2xl">Techs registradas</h2>
                
                <TableTechs/>

                <h2 className="mt-25 mb-20 text-2xl">Turmas registradas</h2>
                
                <TableClasses/>
            </section>

            <button className="mt-15 bg-red-500 w-50 h-10 rounded-lg text-lg transition hover:bg-red-950" onClick={handleLogout}>Sair</button>
        </main>
    )
}
