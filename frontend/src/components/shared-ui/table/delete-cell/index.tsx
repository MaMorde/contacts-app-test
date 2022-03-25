import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { del } from "src/api/requests"
import { useContacts } from "src/context/ContactsContext"

const useStyles = makeStyles({
  removeBtn: {
    cursor: "pointer",
  },
  wrapper: {
    margin: 8,
    position: "relative",
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
})

type DeleteCellProps = {
  id: string
}

const DeleteCell: React.FC<DeleteCellProps> = ({ id }) => {
  const classes = useStyles()
  const { updateContacts } = useContacts()
  const [loading, setLoading] = useState<boolean>()

  const deleteContact = (id: string) => {
    setLoading(true)

    setTimeout(() => {
      del
        .deleteContact(id)
        .then(() => updateContacts())
        .finally(() => setLoading(false))
    }, 1000) // SetTimeout simulates loading
  }

  return !loading ? (
    <DeleteForeverIcon
      className={classes.removeBtn}
      onClick={() => deleteContact(id)}
    />
  ) : (
    <CircularProgress size={24} />
  )
}

export default DeleteCell
