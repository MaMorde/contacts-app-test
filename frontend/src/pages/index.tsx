import type { NextPage } from "next"
import { AuthProvider } from "src/context/AuthContext"

const Home: NextPage = () => (
  <AuthProvider>
    <div>Home</div>
  </AuthProvider>
)

export default Home
