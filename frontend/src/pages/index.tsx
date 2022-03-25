import type { NextPage } from "next"
import HomeContent from "src/components/home"
import { ContactsProvider } from "src/context/ContactsContext"
import Layout from "src/layout"

const Home: NextPage = () => (
  <ContactsProvider>
    <Layout>
      <HomeContent />
    </Layout>
  </ContactsProvider>
)

export default Home
