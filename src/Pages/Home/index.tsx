import { Banner } from "../../Components/Banner"
import { FaRegStar } from "react-icons/fa";
import { ModuleCard } from "../../Components/ModuleCard";


export const Home = () => {
    return (
        <main>
            <Banner />

            <section className="text-center py-15">
                <div className="my-10 border-gradient w-70 p-2 m-auto rounded-lg flex gap-2.5 justify-center items-center flex-row">
                    <FaRegStar className="text-2xl text-pink-500" /> <h3 className="text-lg text-secondary-gradient">Alunos em destaque</h3>
                </div>

                <h2 className="text-2xl">Os alunos que <span className="gradient text-gradient text-2xl">mais dominam tecnologias</span></h2>

                <div className="my-20 px-20">
                    {/* <ModuleCard/> */}
                </div>
            </section>
        </main>
    )
}