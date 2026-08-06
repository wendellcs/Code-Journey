import { StudentForm } from "../../Components/Forms/StudentForm"
import { ClassForm } from "../../Components/Forms/ClassForm"
import { TechsForm } from "../../Components/Forms/TechsForm"
import { TableStudents } from "../../Components/Tables/TableStudents"
import { TableTechs } from "../../Components/Tables/TableTechs"

export const Dashboard = () => {
    return (
        <main className="text-center py-15 px-5 relative overflow-clip bg-main-aurora max-md:px-0">
            <nav>
                <a href="#"></a>
            </nav>

            <h1 className="mt-25 mb-20 text-3xl">Dashboard</h1>

            <section className="grid grid-cols-3 max-w-380 mx-auto items-start gap-10 max-2xl:grid-cols-1">
                <ClassForm />

                <StudentForm />

                <TechsForm />
            </section>
            <section>
                <h2 className="mt-25 mb-20 text-2xl">Alunos registrados</h2>

                <TableStudents />

                <h2 className="mt-25 mb-20 text-2xl">Techs registradas</h2>
                
                <TableTechs/>
            </section>

        </main>
    )
}
