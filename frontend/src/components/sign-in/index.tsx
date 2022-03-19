import React from "react"
import { Field, Formik } from "formik"
import * as Yup from "yup"
import { makeStyles } from "@material-ui/core/styles"
import { post, setToken } from "src/api"
import { LS_ID_TOKEN } from "src/utils/variables"
import { useAuth } from "src/context/AuthContext"
import { useRouter } from "next/router"

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
    position: "relative",
    display: "block",
    width: "100%",
    padding: "16px 21px",
    fontSize: "14px",
    lineHeight: "17px",
    borderRadius: "4px",
    border: "1px solid #d8d8d8",
    "&:first-child": {
      marginBottom: "10px",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "43px",
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
  const CreateListSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  })

  const { state, dispatch } = useAuth()

  if (state?.isSignedIn) {
    router.push("/")
  }

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={CreateListSchema}
          onSubmit={(values, { setSubmitting }) => {
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
              })
              .catch((err) => console.log(err))
          }}
        >
          {({ handleSubmit, isSubmitting, errors, touched, isValid }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Field
                className={classes.field}
                name="email"
                placeholder="E-mail"
              />
              {errors.email && touched.email ? (
                <div className={classes.error}>{errors.email}</div>
              ) : null}
              <Field
                className={classes.field}
                name="password"
                placeholder="Password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null}
              <div className={classes.buttonContainer}>
                <button
                  className={classes.button}
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  <span className={classes.buttonText}>Sign In</span>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignIn
