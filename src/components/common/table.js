import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tablebody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
