import React, { useState } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line } from "react-chartjs-2";
// @material-ui/core components

// import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import axios from "axios.js";

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import {
  // MenuItem,
  // FormControl,
  // IconButton,
  // InputAdornment,
  // InputLabel,
  // OutlinedInput,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(componentStyles);

function AddNewUser() {
  console.log("AddNewUserMounted");
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("employee");

  const [Submit, setSubmit] = useState(false);

  const RequestToCreateUser = async () => {
    console.log(
      "Data Recieved from Form =>",
      Name,
      Email,
      Contact,
      Password,
      Role
    );
    setSubmit(true);
    try {
      console.log("Initiating Request");
      const Response = await axios.post("/user/create", {
        Name,
        Email,
        Contact,
        Password,
        Role,
      });
      console.log("Response", Response.data);
      console.log("Request Successfull!");
      window.location.href = window.location.origin + "/#/admin/users";
    } catch (e) {
      console.log("Request Failed!", e);
      setSubmit(false);
    }
  };

  const [ShowPassword, setShowPassword] = useState(false);
  // const [Role, setRole] = useState("SELECT");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={0}
            xl={3}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          ></Grid>
          <Grid
            item
            xs={12}
            xl={6}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootBgGradient,
              }}
            >
              <CardContent>
                <div>
                  <h1 style={{ color: "rgb(250,250,250)" }}>Create New User</h1>
                  <TextField
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    disabled={Submit}
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      borderColor: "white",
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    disabled={Submit}
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderColor: "white",
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Contact"
                    variant="outlined"
                    disabled={Submit}
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={{
                      borderColor: "white",
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    disabled={Submit}
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      borderColor: "white",
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />

                  <FormControl component="fieldset">
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      defaultValue={Role}
                      name="radio-buttons-group"
                      value={Role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <FormControlLabel
                        value="employee"
                        control={<Radio />}
                        disabled={Submit}
                        label="Employee"
                      />
                      <FormControlLabel
                        value="viewer"
                        control={<Radio />}
                        disabled={Submit}
                        label="Report Viewer"
                      />
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        disabled={Submit}
                        label="Admin"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="outlined"
              onClick={RequestToCreateUser}
              disabled={Submit}
              style={{
                marginTop: 20,
                // width: 300,
              }}
            >
              Create User
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewUser;
