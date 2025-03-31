import React from "react";
import "./Pagination.css";
interface Props {
  totalToDos: number;
  toDosPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Pagination = ({
  totalToDos,
  toDosPerPage,
  setCurrentPage,
  currentPage,
}: Props) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalToDos / toDosPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
