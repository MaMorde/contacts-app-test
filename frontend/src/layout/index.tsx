import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"
import { AppBar, Button, Toolbar } from "@material-ui/core"
import { useAuth } from "src/context/AuthContext"
import { LS_ID_TOKEN } from "src/utils/variables"

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  content: {},
  toolbar: {
    display: "flex",
    minHeight: "64px",
    justifyContent: "end",
  },
  button: {
    background: "white",
    color: "black",
  },
})

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const { state, dispatch } = useAuth()

  return (
    <div className={classes.container}>
      {state?.isSignedIn && (
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Button
              className={classes.button}
              onClick={() => {
                localStorage.removeItem(LS_ID_TOKEN)
                dispatch({
                  type: "UPDATE_AUTH_DATA",
                  payload: {
                    isSignedIn: false,
                  },
                })
              }}
              color="inherit"
              variant="contained"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <div className={classes.content}>{children}</div>
    </div>
  )
}

export default Layout
