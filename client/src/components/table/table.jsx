import "./table.scss";
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
const trans = JSON.parse(localStorage.getItem("transactions"))

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell">Tracking ID</TableCell> */}
            <TableCell className="tableCell"  >Transaction Type</TableCell>
            {/* <TableCell className="tableCell">Customer</TableCell> */}
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Current Balance</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trans?.map((row) => (
            <TableRow key={row.id} >
              {/* <TableCell className="tableCell">{row._id}</TableCell> */}
              <TableCell className="tableCell">
                <div className="cellWrapper {`type ${row.type}`} ">
                  {row.type}
                </div>
              </TableCell>
              <TableCell className="tableCell">{
               new Date(row.createdAt).toLocaleDateString()
              
              }</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.currentbalance}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status = "success"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
