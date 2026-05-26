import css from './Pagination.module.css';
import type { ReactPaginateProps } from 'react-paginate';
import ReactPaginateModule from 'react-paginate';
import type { ComponentType } from "react";

interface PaginationProps {
  pageCount: number,
  currentPage: number,
  onPageChange: (page: number) => void
}

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function Pagination({pageCount,currentPage, onPageChange}: PaginationProps) {
    return (
        <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
        forcePage={currentPage}
        
     onPageChange={(event: { selected: number }) => onPageChange(event.selected)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
    )
}