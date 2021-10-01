import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "@material-ui/core/CardHeader";
// import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";

import axios from "axios.js";
// Context API
import { useStateValue } from "../../StateProvider";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const useStyles = makeStyles(componentStyles);

function Login() {
  const [{ Auth }, dispatch] = useStateValue();

  const [ErrMsg, setErrMsg] = useState("");
  const [ReqFailedErr, setReqFailedErr] = useState(false);

  const [__Email, set__Email] = useState("admin@lughut.com");
  const [__Password, set__Password] = useState("123");
  const [Submit, setSubmit] = useState(false);

  const MakeUserLoggedIn = async () => {
    setSubmit(true);
    try {
      console.log("Login request initiating...");
      const Response = await axios.post("/auth", {
        Email: __Email,
        Password: __Password,
      });
      console.log("Response Recieved", Response.data);
      // return;
      // check if exists
      if (typeof Response.data == String) {
        console.log("Invalid Email/Password!");
        setErrMsg("Invalid Email/Password!");
        setReqFailedErr(true);
        setSubmit(false);
        return;
      }
      dispatch({
        type: "SET_UserProfile",
        item: Response.data,
      });
      dispatch({
        type: "SET_AUTH",
        item: true,
      });
      console.log("Login Request Successfull!");
      window.location.href =
        window.location.origin + "/#/" + Response.data.Role;
    } catch (e) {
      console.log("Login Request Failed!", e);
      setErrMsg("Request Failed!");
      setReqFailedErr(true);
      setSubmit(false);
    }
  };

  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Snackbar
        open={ReqFailedErr}
        autoHideDuration={6000}
        onClose={() => setReqFailedErr(false)}
      >
        <Alert
          onClose={() => setReqFailedErr(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {ErrMsg}
        </Alert>
      </Snackbar>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1rem"
              marginTop=".5rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Please enter your credentials
              </Box>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="on"
                autoFocus="on"
                type="email"
                placeholder="Email"
                value={__Email}
                onChange={(e) => set__Email(e.target.value)}
                disabled={Submit}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Password"
                value={__Password}
                onChange={(e) => set__Password(e.target.value)}
                disabled={Submit}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
              />
            </FormControl>

            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button
                color="primary"
                variant="contained"
                disabled={Submit}
                onClick={() => MakeUserLoggedIn()}
              >
                LogIn
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Login;
