import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { AuthProvider } from "src/context/AuthContext"

const SafeHydrate: React.FC = ({ children }) => (
  <div suppressHydrationWarning>
    {typeof window === "undefined" ? null : children}
  </div>
)

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <SafeHydrate>
      <Component {...pageProps} />
    </SafeHydrate>
  </AuthProvider>
)

export default App
