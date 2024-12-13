export interface CustomTableType {
  tableData: any;
  headCells: any;
  dataFields: any;
  selectedUserAction: any;
  loading: boolean;
  fetching: boolean;
  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  rowsPerPage?: number;
  hidePagination?: boolean;
  currentPage: number;
  totalPages: number;
  handlePageChange?: (pageNumber: number) => void;
  handleSort: (sortKeyOrder: { sort: string; order: "DESC" | "ASC" }) => void;
}

export type Order = "asc" | "desc";
