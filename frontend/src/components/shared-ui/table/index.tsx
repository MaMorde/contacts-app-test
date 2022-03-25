import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress, Table as MuiTable } from "@material-ui/core"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import TableHead from "./table-head"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { del } from "src/api/requests"
import { useContacts } from "src/context/ContactsContext"
import DeleteCell from "./delete-cell"

const useStyles = makeStyles({
  root: {},
  table: {
    overflow: "hidden",
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: "#e1e1e1",
    },
  },
})

type TableProps = {
  data: Contact[]
}

const Table: React.FC<TableProps> = ({ data }) => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.root} component={Paper}>
      <MuiTable
        className={classes.table}
        size="small"
        aria-label="a dense table"
      >
        <TableHead />
        <TableBody>
          {data?.map((contact: Contact) => (
            <TableRow className={classes.row} key={contact.id}>
              <TableCell component="th" scope="row">
                {contact.name}
              </TableCell>
              <TableCell align="right">{contact.email}</TableCell>
              <TableCell align="right">{contact.age}</TableCell>
              <TableCell align="right">{contact.address}</TableCell>
              <TableCell align="right">{contact.phone}</TableCell>
              <TableCell align="right">{contact.gender}</TableCell>
              <TableCell align="right">{contact.company}</TableCell>
              <TableCell align="right">{contact.balance}</TableCell>
              <TableCell align="right">
                <DeleteCell id={contact?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export default Table
