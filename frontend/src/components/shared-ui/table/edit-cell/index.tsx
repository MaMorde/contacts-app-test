import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { useContacts } from "src/context/ContactsContext"
import EditIcon from "@material-ui/icons/Edit"
import AddContactModal from "../../modals/add-contact-modal"

const useStyles = makeStyles({
  editButton: {
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

type EditCellProps = {
  contact: Contact
}

const EditCell: React.FC<EditCellProps> = ({ contact }) => {
  const classes = useStyles()
  const { state, updateContacts } = useContacts()
  const [loading, setLoading] = useState<boolean>()
  const [open, setOpen] = useState<boolean>(false)

  return !loading ? (
    <>
      <AddContactModal
        data={contact}
        open={open}
        onClose={() => setOpen(false)}
      />
      <EditIcon className={classes.editButton} onClick={() => setOpen(true)} />
    </>
  ) : (
    <CircularProgress size={24} />
  )
}

export default EditCell
