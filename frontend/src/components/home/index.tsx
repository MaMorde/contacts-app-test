import { makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { get } from "src/api/requests"
import Table from "../shared-ui/table"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "100px 50px 0",
  },
})

const HomeContent: React.FC = () => {
  const classes = useStyles()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true)
        await get.getContacts().then((contacts) => setContacts(contacts))
        setLoading(false)
      } catch (err) {
        console.log("Home fetchDataAsync err ==>", err)
      }
    }
    fetchDataAsync()
  }, [])

  return (
    <div className={classes.root}>
      <Table data={contacts} />
    </div>
  )
}

export default HomeContent
