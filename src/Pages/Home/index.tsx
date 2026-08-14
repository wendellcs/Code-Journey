import { Banner } from "../../Components/UI/Banner"
import { FaRegStar } from "react-icons/fa"
import { ModuleCard } from "../../Components/ModuleCard"
import { Students } from "../../Components/Students"
import { LoadingRocket } from "../../Components/UI/Loading"

import { BsGraphUpArrow, BsPeopleFill } from "react-icons/bs"
import { IoTrophyOutline } from "react-icons/io5"
import { Aurora } from "../../Components/Visuals/Aurora"
import { useEffect, useState } from "react"
import axios from "axios"
import { images } from '../../Utilities/profileImages'

type RegisteredDataTotal = {
    total_students: number
    total_technologies: number
    total_classes: number
}

type Metrics = {
    techs_metrics: number
}

type Leader = {
    id: string
    first_name: string
    last_name: string
    module: string
    topics_mastered: number
    points: number
}
type ModuleName = 'Young 1' | 'Young 2' | 'Young 3' | 'Young 4'

export const Home = () => {
    const [registeredDataTotal, setRegisteredDataTotal] = useState<RegisteredDataTotal | null>(null)
    const [metrics, setMetrics] = useState<Metrics | null>(null)
    const [leaders, setLeaders] = useState<Record<string, Leader[]>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        let isMounted = true
        setIsLoading(true)

        async function getData() {

            try {
                const [resGeneral, resMetrics, resLeaders] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/general/total`),
                    axios.get(`${import.meta.env.VITE_API_URL}/general/metrics`),
                    axios.get(`${import.meta.env.VITE_API_URL}/students/leaders`)
                ]);

                if (isMounted) {
                    setRegisteredDataTotal(resGeneral.data)
                    setMetrics({ techs_metrics: resMetrics.data.total })
                    setLeaders(resLeaders.data)
                }

                setIsLoading(false)
            } catch (e: any) {
                if (isMounted) console.error(e)
                setIsLoading(false)
            }
        }

        getData();

        return () => {
            isMounted = false
        };
    }, []);

    return (
        <main className="relative">
            <Banner />

            <section className="text-center py-15 px-10 relative overflow-clip bg-main-aurora">
                <Aurora type={"three"} className="top-0 right-0 animate-float" />
                <Aurora type={"four"} className="animate-float left-0 max-sm:animate-none" />

                <div className="my-10 border-gradient w-70 p-2 m-auto rounded-lg flex gap-2.5 justify-center items-center flex-row">
                    <FaRegStar className="text-2xl text-pink-500" /> <h3 className="text-lg text-secondary-gradient">Alunos em destaque</h3>
                </div>

                <h2 className="text-2xl relative">Os alunos que <span className="gradient text-gradient text-2xl">mais dominam tecnologias</span></h2>

                {isLoading ? <LoadingRocket /> :
                    (
                        <>
                            <div className="my-20 w-full max-w-387.5 mx-auto grid gap-4 place-items-center justify-center relative 2xl:grid-cols-4 max-2xl:grid-cols-[1fr_1fr] max-2xl:gap-10 max-md:grid-cols-1">
                                {leaders && Object.keys(leaders).length > 0 ? Object.entries(leaders).map(([moduleName, students]) => {

                                    if (!Array.isArray(students) || students.length === 0) {
                                        return null;
                                    }

                                    const first = students[0]
                                    const second = students[1]

                                    const modules = {
                                        'Young 1': {
                                            variant: 'blue',
                                            subtitle: 'Lógica de programação'
                                        },
                                        'Young 2': {
                                            variant: 'orange',
                                            subtitle: 'Desenvolvimento web'
                                        },
                                        'Young 3': {
                                            variant: 'yellow',
                                            subtitle: 'Desenvolvimento web avançado'
                                        },
                                        'Young 4': {
                                            variant: 'green',
                                            subtitle: 'Backend'
                                        }
                                    }

                                    let profileImage = images[Math.floor(Math.random() * images.length)]
                                    const { variant, subtitle } = modules[moduleName as ModuleName]

                                    return (
                                        <ModuleCard key={moduleName}
                                            title={moduleName}
                                            subtitle={subtitle}
                                            variant={variant as "blue" | "orange" | "yellow" | "green"}
                                            topStudent={first ? {
                                                name: `${first.first_name} ${first.last_name}`,
                                                progress: first.points,
                                                avatar: profileImage,
                                                topics: first.topics_mastered
                                            } : null}
                                            secondStudent={second ? {
                                                name: `${second.first_name} ${second.last_name}`,
                                                progress: second.points,
                                                avatar: profileImage,
                                                topics: second.topics_mastered
                                            } : null} />
                                    )
                                }) : null}
                            </div>

                            <div className="w-full relative max-w-237 gradient-border bg-student-card-background mx-auto rounded-2xl p-10 max-lg:max-w-172.5 max-md:max-w-62.5">
                                <Aurora type={"five"} className="animate-float left-0 rotate-20" />
                                <div className="text-left flex w-full justify-center gap-10 relative z-1 max-md:flex-col">
                                    <div className="flex items-center gap-5 max-lg:flex-col">
                                        <div className="border border-purple-icon-border bg-purple-icon-background rounded-lg">
                                            <BsPeopleFill className="text-5xl m-4 text-purple-icon" />
                                        </div>
                                        <div className="min-w-40 flex flex-col max-lg:items-center">
                                            <p className="text-[28px] font-medium">{registeredDataTotal?.total_students ?? 0}</p>
                                            <p className="text-sm text-secondary">Alunos competindo</p>

                                            <p className="text-increase-indicator">+{registeredDataTotal?.total_students ?? 0} essa semana</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 max-lg:flex-col">
                                        <div className="border border-blue-icon-border bg-blue-icon-background rounded-lg">
                                            <IoTrophyOutline className="text-5xl m-4 text-blue-icon" />
                                        </div>
                                        <div className="min-w-40 flex flex-col max-lg:items-center">
                                            <p className="text-[28px] font-medium">{registeredDataTotal?.total_technologies ?? 0}</p>
                                            <p className="text-sm text-secondary">Tecnologias dominadas</p>

                                            <p className="text-increase-indicator">+{metrics?.techs_metrics ?? 0} essa semana</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 max-lg:flex-col">
                                        <div className="border border-green-icon-border bg-green-icon-background rounded-lg">
                                            <BsGraphUpArrow className="text-5xl m-4 text-green-icon" />
                                        </div>
                                        <div className="min-w-40 flex flex-col max-lg:items-center">
                                            <p className="text-[28px] font-medium">100%</p>
                                            <p className="text-sm text-secondary">Média de evolução</p>

                                            <p className="text-increase-indicator">+6% essa semana</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Students />
                        </>
                    )}
            </section>
        </main >
    )
}


