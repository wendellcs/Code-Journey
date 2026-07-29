import { Students } from "../../Components/Students"
import { StudentForm } from "../../Components/StudentForm"
import { ClassForm } from "../../Components/ClassForm"


export const Dashboard = () => {
   
    return (
        <main className="text-center py-15 px-5 relative overflow-clip bg-main-aurora">
            <h1 className="mt-25 mb-20 text-3xl">Dashboard</h1>

            <StudentForm/>  

            <ClassForm/>
            
            <Students />
        </main>
    )
}
