import React, {useState} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged = x => x, portionSize = 10}) => {
    let [portionNumber, setPortionNumber] = useState<number>(1)
	let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []

    for(let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

	return (
        <div className={styles.pagination}>
            {portionNumber > 1 &&
                <button className={styles.pagination__arrow} onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
                 {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span key={p} className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNum)} onClick={(e) => {onPageChanged(p)}}>{p}</span>)}
            {portionCount > portionNumber &&
            <button className={styles.pagination__arrow} onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}
        </div>
	)
}

export default Paginator