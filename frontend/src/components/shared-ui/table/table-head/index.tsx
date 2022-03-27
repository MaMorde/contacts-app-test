import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import { TableHead as MuiTableHead } from "@material-ui/core"
import TableRow from "@material-ui/core/TableRow"

const useStyles = makeStyles({
  root: {
    background: "#aaaaaa",
  },
  cell: {
    fontWeight: "bold",
  },
})

const TableHead: React.FC = () => {
  const classes = useStyles()

  return (
    <MuiTableHead>
      <TableRow className={classes.root}>
        <TableCell className={classes.cell}>Name</TableCell>
        <TableCell className={classes.cell} align="right">
          Email
        </TableCell>
        <TableCell className={classes.cell} align="right">
          Age
        </TableCell>
        <TableCell className={classes.cell} align="right">
          Address
        </TableCell>
        <TableCell className={classes.cell} align="right">
          Phone
        </TableCell>
        <TableCell className={classes.cell} align="right">
          Gender
        </TableCell>
        <TableCell className={classes.cell} align="right">
          Company
        </TableCell>
        <TableCell className={classes.cell} align="right">
          Balance
        </TableCell>
        <TableCell className={classes.cell} align="right"></TableCell>
        <TableCell className={classes.cell} align="right"></TableCell>
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead
