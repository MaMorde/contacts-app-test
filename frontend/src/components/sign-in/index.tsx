import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { makeStyles } from "@material-ui/core/styles"
import { post, setToken } from "src/api"
import { LS_ID_TOKEN } from "src/utils/variables"
import { useAuth } from "src/context/AuthContext"
import { useRouter } from "next/router"
import { Button, TextField } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    background: "#FFFFFF",
    maxWidth: "475px",
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "54px 35px 43px",
  },
  formContainer: {
    maxWidth: "406px",
    margin: "auto",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "25px",
  },
  button: {
    maxWidth: "211px",
    width: "100%",
    height: "42px",
    padding: "11px",
    marginBottom: "29px",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
})

const SignIn: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const CreateListSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  })

  const { dispatch } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: CreateListSchema,
    onSubmit: (values) => {
      setLoading(true)
      post
        .signIn(values.email, values.password)
        .then((res) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(LS_ID_TOKEN, res?.access_token)
          }
          setToken(res?.access_token)
          dispatch({
            type: "UPDATE_AUTH_DATA",
            payload: {
              isSignedIn: true,
            },
          })
          router.push("/")
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    },
  })

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.field}
            fullWidth
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            className={classes.field}
            fullWidth
            variant="outlined"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={!formik.dirty || !formik.isValid || loading}
            >
              <span className={classes.buttonText}>Sign In</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
