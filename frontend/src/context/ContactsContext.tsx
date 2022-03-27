import * as React from "react"
import { get } from "src/api"
import { setTimeout } from "timers"

type State = {
  isLoading: boolean
  contacts: Contact[]
}

type Action =
  | { type: "UPDATE_CONTACTS"; payload: Contact[] }
  | { type: "UPDATE_IS_LOADING"; payload: boolean }

type Dispatch = React.Dispatch<Action>

type ContextType = {
  state: State
  dispatch: Dispatch
  updateContacts: () => void
}

const ContactsContext = React.createContext<ContextType | null>(null)

const ContactsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_CONTACTS": {
      return {
        ...state,
        contacts: action.payload,
      }
    }
    case "UPDATE_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const ContactsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(ContactsReducer, {
    contacts: [],
    isLoading: false,
  })

  React.useEffect(() => {
    const setContacts = async () => {
      updateIsLoading(true)
      setTimeout(() => {
        updateContacts()
        updateIsLoading(false)
      }, 1000) // SetTimeout simulates loading
    }
    setContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateContacts = async () => {
    try {
      const contactsResponse = await get.getContacts()
      dispatch({
        type: "UPDATE_CONTACTS",
        payload: contactsResponse,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("setContacts err", err)
    }
  }

  const updateIsLoading = (value: boolean) => {
    dispatch({
      type: "UPDATE_IS_LOADING",
      payload: value,
    })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      updateContacts,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}

const useContacts = (): ContextType => {
  const context = React.useContext(ContactsContext)
  if (context === null) {
    throw new Error("useContacts must be used within a ContactsProvider")
  }
  return context
}

export { ContactsProvider, useContacts }
