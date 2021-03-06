import React, { FormEvent, FormEventHandler, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { post } from "src/api"
import { useContacts } from "src/context/ContactsContext"
import { patch } from "src/api/requests"

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    position: "relative",
    padding: 20,
    maxHeight: 500,
    width: "100%",
    maxWidth: 600,
    height: "100%",
    overflow: "scroll",
  },
  header: {
    display: "flex",
    justifyContent: "end",
  },
  close: {
    position: "fixed",
    cursor: "pointer",
  },
  field: {
    maxWidth: "80%",
    "&:not(:last-child)": {
      marginBottom: 15,
    },
  },
  form: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
})

const defaultValues = {
  balance: "",
  age: 0,
  eyeColor: "",
  name: "",
  gender: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  note: "",
}

type AddContactModalType = {
  data?: Contact
  open: boolean
  onClose: () => void
  type: "create" | "edit"
}

const AddContactModal: React.FC<AddContactModalType> = ({
  data,
  open,
  onClose,
  type,
}) => {
  const classes = useStyles()
  const { updateContacts } = useContacts()

  const [formValues, setFormValues] = useState<Contact>(data || defaultValues)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target
    if (name)
      setFormValues({
        ...formValues,
        [name]: value,
      })
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    post
      .createContact(formValues)
      .then(() => {
        updateContacts()
        onClose()
      })
      .catch((err) => console.log(err))
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()
    if (data?.id)
      patch
        .editContact(data?.id, formValues)
        .then(() => {
          updateContacts()
          onClose()
        })
        .catch((err) => console.log(err))
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className={classes.modalCard}>
        <div className={classes.header}>
          <CloseIcon className={classes.close} onClick={onClose} />
        </div>
        <form
          className={classes.form}
          onSubmit={type === "create" ? handleCreate : handleEdit}
        >
          <TextField
            className={classes.field}
            id="name-input"
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.field}
            id="email-input"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.field}
            id="age-input"
            name="age"
            label="Age"
            fullWidth
            variant="outlined"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.field}
            id="address-input"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
            type="text"
            value={formValues.address}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.field}
            id="phone-input"
            name="phone"
            label="Phone"
            fullWidth
            variant="outlined"
            type="text"
            value={formValues.phone}
            onChange={handleInputChange}
          />
          <FormControl fullWidth className={classes.field}>
            <Select
              name="gender"
              variant="outlined"
              value={formValues.gender}
              onChange={handleSelectChange}
            >
              <MenuItem key="male" value="male">
                male
              </MenuItem>
              <MenuItem key="female" value="female">
                female
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={classes.field}
            id="company-input"
            name="company"
            label="Company"
            fullWidth
            variant="outlined"
            type="text"
            value={formValues.company}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.field}
            id="balance-input"
            name="balance"
            label="Balance"
            fullWidth
            variant="outlined"
            type="text"
            value={formValues.balance}
            onChange={handleInputChange}
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </Modal>
  )
}

export default AddContactModal
