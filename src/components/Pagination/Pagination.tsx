import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
