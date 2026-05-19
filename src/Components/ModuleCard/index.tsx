import { LiaCrownSolid } from "react-icons/lia";
import { TiStarOutline } from "react-icons/ti";
import { ProgressBar } from '../../Components/ProgressBar'
import { FaCode } from "react-icons/fa";

import exampleImage from '../../assets/images/profile-example.png'

interface Student {
    name: string,
    avatar: string,
    progress: number,
    topics: number
}

interface ModuleData {
    title: string,
    subtitle: string,
    variante: 'blue' | 'orange' | 'yellow' | 'green',

    topStudent: Student,
    secondStudent: Student
}

const variants = {
    blue: {
        card: {
            glow: 'shadow-glow-module-1',
            border: 'bg-card-border-gradient-module-1'
        },

        avatar: {
            border: 'bg-avatar-border-gradient-module-1'
        },

        number: {
            border: 'border-number-border-module-1',
            background: 'bg-number-gradient-module-1'
        },

        icon: {
            background: 'bg-icon-background-module-1',
            gradient: 'bg-icon-gradient-module-1'
        },

        progress: {
            wrapper: 'bg-wrapper-background-module-1',
            bar: 'bg-bar-gradient-module-1'
        }
    },

    orange: {
        card: {
            glow: 'shadow-glow-module-2',
            border: 'bg-card-border-gradient-module-2'
        },

        avatar: {
            border: 'bg-avatar-border-gradient-module-2'
        },

        number: {
            border: 'border-number-border-module-2',
            background: 'bg-number-gradient-module-2'
        },

        icon: {
            background: 'bg-icon-background-module-2',
            gradient: 'bg-icon-gradient-module-2'
        },

        progress: {
            wrapper: 'bg-wrapper-background-module-2',
            bar: 'bg-bar-gradient-module-2'
        }
    },

    yellow: {
        card: {
            glow: 'shadow-glow-module-3',
            border: 'bg-card-border-gradient-module-3'
        },

        avatar: {
            border: 'bg-avatar-border-gradient-module-3'
        },

        number: {
            border: 'border-number-border-module-3',
            background: 'bg-number-gradient-module-3'
        },

        icon: {
            background: 'bg-icon-background-module-3',
            gradient: 'bg-icon-gradient-module-3'
        },

        progress: {
            wrapper: 'bg-wrapper-background-module-3',
            bar: 'bg-bar-gradient-module-3'
        }
    },

    green: {
        card: {
            glow: 'shadow-glow-module-4',
            border: 'bg-card-border-gradient-module-4'
        },

        avatar: {
            border: 'bg-avatar-border-gradient-module-4'
        },

        number: {
            border: 'border-number-border-module-4',
            background: 'bg-number-gradient-module-4'
        },

        icon: {
            background: 'bg-icon-background-module-4',
            gradient: 'bg-icon-gradient-module-4'
        },

        progress: {
            wrapper: 'bg-wrapper-background-module-4',
            bar: 'bg-bar-gradient-module-4'
        }
    }
}

export const ModuleCard = (moduleData: ModuleData) => {
    return (
        <div className="p-px w-min rounded-3xl bg-grad-mod1">
            <div className="text-left module-1 shadow-glow-mod1 bg-card w-87.5 flex justify-center rounded-3xl py-10 bg-linear-to-r">
                <div className="w-77.5 h-90">
                    <div className="flex gap-5">
                        <div className="number text-center w-10 h-8 rounded-[50%] border border-transparent bg-origin-border">
                            <p className="text-lg font-medium">1</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <div>
                                <h3 className="text-[14px]">Módulo 1</h3>
                                <p className="text-[14px] text-[#ffffff8e]">Lógica de programação</p>
                            </div>

                            <FaCode className="icon text-3xl" />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 border-b border-gray-600 pb-8">
                        <div className="mt-5">
                            <LiaCrownSolid className="text-3xl m-auto mb-1" />

                            <div className="picture-border">
                                <img src={exampleImage} alt="Foto de perfil do aluno" className="rounded-full w-25" />
                            </div>
                        </div>

                        <div className="mt-8 w-full">
                            <h4 className="text-xl font-medium">Chiquinho Gavião</h4>
                            <p className="flex items-center gap-1 my-2 text-[14px]"><TiStarOutline className="text-2xl" /> 6  Tópicos dominados</p>
                            <ProgressBar progress={92} wrapperStyles={'--bg-progress-bar'} progressBarStyles={' '} />
                        </div>
                    </div>

                    <div className="pt-8 flex items-center gap-6 pb-8">
                        <div className="flex items-center gap-4">
                            <p>2°</p>

                            <div className="picture-border">
                                <img src={exampleImage} alt="Foto de perfil do aluno" className="rounded-full min-w-16" />
                            </div>
                        </div>

                        <div className="w-full">
                            <h5>Chiquinho Gavião</h5>
                            <p className="text-[14px] my-1">6 Tópicos dominados</p>
                            <ProgressBar progress={85} wrapperStyles={'--bg-progress-bar'} progressBarStyles={' '} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}