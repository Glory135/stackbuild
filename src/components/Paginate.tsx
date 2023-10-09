import { toTop } from '@/utils/utilityFunctions';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from 'react';

export default function Paginate({ page, setPage, limit, setLimit }: { page: number, setPage: Function, limit:number, setLimit: Function }) {

    const changePage = (type: 'prev' | 'next'): void => {
        if (page !== 0) {
            if (type === 'prev') {
                setPage((prev: number) => prev - 1)
            }
        }
        if (type === 'next') {
            setPage((prev: number) => prev + 1)
        }
        toTop()
        
    }


    return (
        <div className="pagination">
            <div className="main-paginate">

                <span className="current-page">Current Page: <span>{page + 1}</span> </span>
                <div className="btn-con">
                    <button onClick={() => changePage('prev')} className="btn page-btn"> <ArrowBackIosIcon /> Prev
                    </button>
                    <button onClick={() => changePage('next')} className="btn page-btn">
                        Next <ArrowForwardIosIcon />
                    </button>
                </div>
                <div className="limit">
                    Pages per page:{' '}
                    <select onChange={(e): void => {
                        setLimit(e.target.value);
                        toTop();
                    }}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>

            </div>
        </div>
    )
}
