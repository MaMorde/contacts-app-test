import { CircularProgress, makeStyles } from "@material-ui/core"
import React from "react"
import { useContacts } from "src/context/ContactsContext"
import Table from "../shared-ui/table"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "100px 50px",
  },
})

const HomeContent: React.FC = () => {
  const classes = useStyles()
  const { state } = useContacts()

  return (
    <div className={classes.root}>
      {state.isLoading ? <CircularProgress /> : <Table data={state.contacts} />}
    </div>
  )
}

export default HomeContent
