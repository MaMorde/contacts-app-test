import React, { useLayoutEffect } from "react"
import { NextPage } from "next/types"
import SignIn from "src/components/sign-in"
import { useAuth } from "src/context/AuthContext"
import { useRouter } from "next/router"
import Layout from "src/layout"

const SignInPage: NextPage = () => {
  const router = useRouter()
  const { state } = useAuth()

  useLayoutEffect(() => {
    if (state?.isSignedIn) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSignedIn])

  return (
    <Layout>
      <SignIn />
    </Layout>
  )
}

export default SignInPage
