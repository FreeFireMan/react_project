import React from 'react';
import {range} from '../utils'
import {Link} from "react-router-dom";
import classNames from 'classnames';

const PaginationItem = ({page, currentPage, url}) =>{
    console.log(currentPage);
    const liClasses = classNames({
    'page-item': true,
    active: currentPage === page,
  })
  return (
      <li className={liClasses}>
        <Link to={`${url}?page=${page}`} className="page-link">
          {page}
        </Link>
      </li>
  )
}

const Pagination = ({total,url,limit,currentPage}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount)
  return (
      <nav>
        <ul className="pagination">
          {pages.map(page =>{
            return (
                <PaginationItem
                    key={page}
                    url={url}
                    currentPage={currentPage}
                    page={page}
                />
            )
          })}
        </ul>

      </nav>
  )
}

export default Pagination;
