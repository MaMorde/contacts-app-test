import React, { useEffect, useState } from "react"
import { get } from "src/api/requests"
import Table from "../shared-ui/table"

const HomeContent = () => {
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

  console.log(contacts)

  return (
    <div>
      <Table />
    </div>
  )
}

export default HomeContent
