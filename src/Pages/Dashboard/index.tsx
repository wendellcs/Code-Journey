import { Students } from "../../Components/Students"
import { StudentForm } from "../../Components/Forms/StudentForm"
import { ClassForm } from "../../Components/Forms/ClassForm"
import { TechsForm } from "../../Components/Forms/TechsForm"

export const Dashboard = () => {
    return (
        <main className="text-center py-15 px-5 relative overflow-clip bg-main-aurora">
            <h1 className="mt-25 mb-20 text-3xl">Dashboard</h1>

            <StudentForm />

            <ClassForm />

            <TechsForm/>

            <Students />
        </main>
    )
}
