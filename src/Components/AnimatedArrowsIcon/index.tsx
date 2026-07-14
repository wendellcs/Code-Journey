import clsx from "clsx"

type ArrowPosition = {
    position: string;
}

export const AnimatedArrowsIcon = ({position}:ArrowPosition) => {

    const handleScroll = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return (
        <div className={clsx("flex flex-col absolute cursor-pointer", position)} onClick={handleScroll}>
            <div className='relative w-6.5 h-6.5 border-t-4 border-l-4 border-white rotate-225 animate-arrow-load [animation-delay:0ms]'></div>
            <div className='relative w-6.5 h-6.5 border-t-4 border-l-4 border-white rotate-225 animate-arrow-load [animation-delay:200ms]'></div>
            <div className='relative w-6.5 h-6.5 border-t-4 border-l-4 border-white rotate-225  animate-arrow-load [animation-delay:400ms]'></div>
        </div>
    )
}