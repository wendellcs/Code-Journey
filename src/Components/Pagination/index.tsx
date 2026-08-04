import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import clsx from "clsx";
import type { PageData } from "../../Types/pageData";
import type { RefObject } from "react";
import React from "react";

interface PaginationProps {
    pageData: PageData
    divRef: RefObject<HTMLDivElement | null>
    setPageData: React.Dispatch<React.SetStateAction<PageData>>
}

export const Pagination = ({divRef, pageData, setPageData}:PaginationProps) => {

    const isFirstPage = pageData.current_page <= 1
    const isLastPage = pageData.current_page >= pageData.total_pages

    const handleScrollToTop = () => {
        if (divRef?.current) {
            divRef.current.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
        }
    }

    const handleNextPage = () => {
        if (!isLastPage) {
            setPageData((prev) => ({ ...prev, current_page: prev.current_page + 1 }))
            handleScrollToTop()
        }
    }

    const handlePrevPage = () => {
        if (!isFirstPage) {
            setPageData((prev) => ({ ...prev, current_page: prev.current_page - 1 }))
            handleScrollToTop()
        }
    }

    const handleFirstPage = () => {
        setPageData((prev) => ({ ...prev, current_page: 1 }))
        handleScrollToTop()
    }

    const handleLastPage = () => {
        setPageData((prev) => ({ ...prev, current_page: prev.total_pages }))
        handleScrollToTop()
    }

    return (
        <div className="flex items-center justify-center min-h-10 mb-5 mt-20">
            <div onClick={handlePrevPage} className={clsx("p-1 rounded-lg mr-2 transition hover:scale-110",
                isFirstPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
            )}>
                <MdKeyboardArrowLeft className="text-4xl" />
            </div>
            <div onClick={handleFirstPage} className={clsx(" p-1 rounded-lg transition hover:scale-110",
                isFirstPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
            )}>
                <MdOutlineKeyboardDoubleArrowLeft className="text-4xl" />
            </div>

            <p className="text-3xl mx-10">{pageData.current_page}</p>

            <div onClick={handleLastPage} className={clsx("p-1 rounded-lg mr-2 transition hover:scale-110",
                isLastPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
            )}>
                <MdOutlineKeyboardDoubleArrowRight className="text-4xl" />
            </div>
            <div onClick={handleNextPage} className={clsx(" p-1 rounded-lg transition hover:scale-110",
                isLastPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
            )}>
                <MdKeyboardArrowRight className="text-4xl" />
            </div>
        </div>
    )
}