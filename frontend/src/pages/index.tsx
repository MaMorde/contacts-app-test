import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import HomeContent from "src/components/home"
import { useAuth } from "src/context/AuthContext"
import Layout from "src/layout"

const Home: NextPage = () => {
  const router = useRouter()
  const { state } = useAuth()

  useEffect(() => {
    if (!state?.isSignedIn) {
      router.push("/sign-in")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSignedIn])

  return (
    <Layout>
      <HomeContent />
    </Layout>
  )
}

export default Home
