import React from "react"
import { NextPage } from "next/types"
import { AuthProvider } from "src/context/AuthContext"
import SignIn from "src/components/sign-in"

const SignInPage: NextPage = () => (
  <AuthProvider>
    <SignIn />
  </AuthProvider>
)

export default SignInPage
