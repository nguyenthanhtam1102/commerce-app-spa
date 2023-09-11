import { useMemo } from "react"

const PaginationItem = ({pageIndex}) => {
    return (
        <div className="w-10 h-10 flex items-center justify-center text-white rounded-sm bg-blue-500">
            {pageIndex}
        </div>
    )
}

const Pagination = (props) => {
    const {
        totalPage,
        maxPageDisplay = 5,
        pageButton,
        nextButton,
        previousButton,
        breakButton
    } = props;

    const items = useMemo(() => {
        let arr = [];
        if(totalPage <= maxPageDisplay) {
            for(let i = 1; i <= totalPage; i++) {
                arr.push(<PaginationItem pageIndex={i}/>)
            }
        }
        else {
            for(let i = 1; i <= totalPage && i <= Math.ceil(maxPageDisplay / 2); i++) {
                arr.push(<PaginationItem pageIndex={i}/>)
            }

            arr.push(breakButton)

            for(let i = totalPage - Math.floor(maxPageDisplay / 2); i <= totalPage; i++) {
                arr.push(<PaginationItem pageIndex={i}/>)
            }
        }
        return arr;
    }, [totalPage]);
    
    return (
        <div className="flex gap-2">
            {previousButton}
            {items.map(item => item)}
            {nextButton}
        </div>
    )
}

export default Pagination;