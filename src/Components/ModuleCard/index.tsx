import { LiaCrownSolid } from "react-icons/lia";
import { TiStarOutline } from "react-icons/ti";
import { ProgressBar } from '../Visuals/ProgressBar'
import { FaCode } from "react-icons/fa";

interface Student {
    name: string,
    avatar: string,
    progress: number,
    topics: number
}

interface ModuleData {
    title: string,
    subtitle: string,
    variant: 'blue' | 'orange' | 'yellow' | 'green',

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

export const ModuleCard = (props: ModuleData) => {
    const { title, subtitle, variant, topStudent, secondStudent } = props

    const currentVariant = variants[variant]

    return (
        <div className={`p-px w-full max-w-140 rounded-3xl${currentVariant.card.border}`}>
            <div
                className={`
                    text-left
                    bg-card/85
                    w-full
                    max-w-140
                    flex
                    justify-center
                    rounded-3xl
                    py-10
                    ${currentVariant.card.glow}
                `}
            >
                <div className="w-full max-w-[90%] h-90">

                    {/* Header */}
                    <div className="flex gap-5">
                        <div
                            className={`
                                text-center
                                w-10
                                h-8
                                rounded-[50%]
                                border
                                border-transparent
                                bg-origin-border
                                ${currentVariant.number.border}
                                ${currentVariant.number.background}
                            `}
                        >
                            <p className="text-lg font-medium">1</p>
                        </div>

                        <div className="flex justify-between w-full">
                            <div>
                                <h3 className="text-[14px]">
                                    {title}
                                </h3>

                                <p className="text-[14px] text-[#ffffff8e]">
                                    {subtitle}
                                </p>
                            </div>

                            <div
                                className={`
                                    p-3
                                    rounded-xl
                                    ${currentVariant.icon.background}
                                    ${currentVariant.icon.gradient}
                                `}
                            >
                                <FaCode className="text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Top Student */}
                    <div className="flex items-center gap-5 border-b border-gray-600 pb-8">
                        <div className="mt-5">
                            <LiaCrownSolid className="text-3xl m-auto mb-1" />

                            <div className={`p-px rounded-full ${currentVariant.avatar.border}`}>
                                <img
                                    src={topStudent.avatar}
                                    alt={`Foto de perfil de ${topStudent.name}`}
                                    className="rounded-full w-25"
                                />
                            </div>
                        </div>

                        <div className="mt-8 w-full">
                            <h4 className="text-xl font-medium">
                                {topStudent.name}
                            </h4>

                            <p className="flex items-center gap-1 my-2 text-[14px]">
                                <TiStarOutline className="text-2xl" />
                                {topStudent.topics} tópicos dominados
                            </p>

                            <ProgressBar
                                progress={topStudent.progress}
                                wrapperStyles={currentVariant.progress.wrapper}
                                progressBarStyles={currentVariant.progress.bar}
                            />
                        </div>
                    </div>

                    {/* Second Student */}
                    <div className="pt-8 flex items-center gap-6 pb-8">
                        <div className="flex items-center gap-4">
                            <p>2°</p>

                            <div className={`p-px rounded-full ${currentVariant.avatar.border}`}>
                                <img
                                    src={secondStudent.avatar}
                                    alt={`Foto de perfil de ${secondStudent.name}`}
                                    className="rounded-full min-w-16"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <h5>
                                {secondStudent.name}
                            </h5>

                            <p className="text-[14px] my-1">
                                {secondStudent.topics} tópicos dominados
                            </p>

                            <ProgressBar
                                progress={secondStudent.progress}
                                wrapperStyles={currentVariant.progress.wrapper}
                                progressBarStyles={currentVariant.progress.bar}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}