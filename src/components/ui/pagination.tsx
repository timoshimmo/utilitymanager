import RCPagination, { PaginationProps } from "rc-pagination";
import { ArrowNext } from "../icons/arrow-next";
import { ArrowPrev } from "../icons/arrow-prev";
import "rc-pagination/assets/index.css";

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
};

export default Pagination;
