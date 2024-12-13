import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Pagination.css";

interface Props {
  totalPages: number;
  page: number;
  handlePage: (pageNumber: number) => void;
}

const CustomPagination = ({ totalPages, page, handlePage }: Props) => {
  return (
    <div className="pagination-wrap">
      <Stack spacing={2}>
        <Pagination
          shape="rounded"
          page={page}
          count={totalPages}
          sx={{
            ".MuiPagination-ul": { flexWrap: "nowrap !important" },
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--secondary) !important",
              color: "#fff !important",
            },
            ".MuiPaginationItem-root:not(.Mui-selected):hover": {
              backgroundColor: "rgba(67, 215, 158, 0.3) !important",
            },
          }}
          onChange={(e, page: number) => handlePage(page)}
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;
