import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { AuthProvider } from "src/context/AuthContext"
import { ContactsProvider } from "src/context/ContactsContext"

const SafeHydrate: React.FC = ({ children }) => (
  <div suppressHydrationWarning>
    {typeof window === "undefined" ? null : children}
  </div>
)

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <SafeHydrate>
      <ContactsProvider>
        <Component {...pageProps} />
      </ContactsProvider>
    </SafeHydrate>
  </AuthProvider>
)

export default App
