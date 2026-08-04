import { StudentForm } from "../../Components/Forms/StudentForm"
import { ClassForm } from "../../Components/Forms/ClassForm"
import { TechsForm } from "../../Components/Forms/TechsForm"
import { TableStudents } from "../../Components/Tables/TableStudents"

export const Dashboard = () => {
    return (
        <main className="text-center py-15 px-5 relative overflow-clip bg-main-aurora max-md:px-0">
            <h1 className="mt-25 mb-20 text-3xl">Dashboard</h1>

            <StudentForm />

            <ClassForm />

            <TechsForm/>

            <section>
                <h2 className="mt-25 mb-20 text-2xl">Informações gerais</h2>

                <TableStudents/>
            </section>
            
        </main>
    )
}
