import {
  Button,
  CircularProgress,
  debounce,
  Input,
  makeStyles,
  TextField,
} from "@material-ui/core"
import React, { useEffect, useMemo, useState } from "react"
import { useContacts } from "src/context/ContactsContext"
import AddContactModal from "../shared-ui/modals/add-contact-modal"
import Table from "../shared-ui/table"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "50px 50px",
  },
  actions: {
    width: "80%",
    display: "flex",
    marginBottom: 50,
  },
  button: {
    maxWidth: 150,
    width: "100%",
    marginLeft: 20,
  },
})

const HomeContent: React.FC = () => {
  const classes = useStyles()
  const { state } = useContacts()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [searchText, setSearchText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Contact[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    if (state.contacts) {
      const results = state.contacts.filter((item: Contact) => {
        return (
          item.name
            .toLowerCase()
            .toString()
            .includes(searchText.toLowerCase()) ||
          item.age.toString().includes(searchText.toLowerCase()) ||
          item.balance
            .toLowerCase()
            .toString()
            .includes(searchText.toLowerCase()) ||
          item.company
            .toLowerCase()
            .toString()
            .includes(searchText.toLowerCase()) ||
          item.gender
            .toLowerCase()
            .toString()
            .includes(searchText.toLowerCase()) ||
          item.address
            .toLowerCase()
            .toString()
            .includes(searchText.toLowerCase()) ||
          item.phone.toLowerCase().toString().includes(searchText.toLowerCase())
        )
      })

      setSearchResults(results)
    }
  }, [state.contacts, searchText])

  const debounceHandleSearch = useMemo(() => {
    return debounce(handleSearch, 300)
  }, [])

  const handleClose = () => {
    setModalIsOpen(false)
  }

  return (
    <div className={classes.root}>
      <div className={classes.actions}>
        <TextField
          placeholder="Search contact..."
          variant="outlined"
          fullWidth
          onChange={debounceHandleSearch}
        />
        <Button
          className={classes.button}
          color="inherit"
          variant="contained"
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          Add Contact
        </Button>
        <AddContactModal
          type="create"
          open={modalIsOpen}
          onClose={handleClose}
        />
      </div>
      {state.isLoading ? <CircularProgress /> : <Table data={searchResults} />}
    </div>
  )
}

export default HomeContent
