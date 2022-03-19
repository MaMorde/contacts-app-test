import * as React from "react"
import { setToken } from "src/api"
import { LS_ID_TOKEN } from "src/utils/variables"

type Tokens = {
  isSignedIn?: boolean
}

type Action = { type: "UPDATE_AUTH_DATA"; payload: Tokens }

type State = Tokens | null

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const AuthContext = React.createContext<ContextType | null>(null)

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_AUTH_DATA": {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const getIdToken = () => {
  const lsIdToken =
    typeof window !== "undefined" ? localStorage.getItem(LS_ID_TOKEN) : null

  if (lsIdToken) {
    return lsIdToken
  }

  return null
}

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, null, () => {
    const token = getIdToken()
    if (token) {
      setToken(token)

      return { isSignedIn: true }
    }
    return { isSignedIn: false }
  })

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = (): ContextType => {
  const context = React.useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
