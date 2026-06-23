import clsx from "clsx"
import { AuroraOne } from "./AuroraOne"
import { AuroraTwo } from "./AuroraTwo"
import { AuroraThree } from "./AuroraThree"
import { AuroraFour } from "./AuroraFour"
import { AuroraFive } from "./AuroraFive"

const auroras = {
    one: AuroraOne,
    two: AuroraTwo,
    three: AuroraThree,
    four: AuroraFour,
    five: AuroraFive
}

type AuroraType = keyof typeof auroras

type AuroraProps = {
    type: AuroraType;
    className?: string;
}

export const Aurora = ({type, className}: AuroraProps) => {

    const Component = auroras[type]

    if (!Component) return null

    return (
        <div className={clsx("absolute",className)}>
            <Component/>
        </div>
    )
}