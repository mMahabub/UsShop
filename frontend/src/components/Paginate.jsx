import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null; // Only show pagination if there are multiple pages

  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <Pagination.Item
          key={x + 1}
          as={Link}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
          active={x + 1 === page} // Highlight current page
        >
          {x + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginate;