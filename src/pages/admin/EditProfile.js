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

// import LinearProgress from "@material-ui/core/LinearProgress";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";

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

import axios from "axios.js";
// Context API
import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles(componentStyles);

function EditProfile() {
  console.log("AddNewUserMounted");
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [{ Auth, UserProfile }, dispatch] = useStateValue();

  const [Name, setName] = useState(UserProfile.Name);
  const [Email, setEmail] = useState(UserProfile.Email);
  const [Contact, setContact] = useState(UserProfile.Contact);
  const [Submit, setSubmit] = useState(false);

  const RequestToUpdate = async () => {
    setSubmit(true);
    try {
      console.log("Initiating Update Request ...");
      const Response = await axios.post("/user/update", {
        _id: UserProfile._id,
        Name,
        Email,
        Contact,
      });
      console.log("Response recieved", Response.data);
      console.log("Request Successfull");
      setSubmit(false);
    } catch (e) {
      console.log("Request Failed!", e);
      setSubmit(false);
    }
  };

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
                  <h1 style={{ color: "rgb(250,250,250)" }}>Edit Profile</h1>
                  <TextField
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    spellCheck={false}
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={Submit}
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
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={Submit}
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
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    disabled={Submit}
                    style={{
                      borderColor: "white",
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Button
              variant="outlined"
              onClick={RequestToUpdate}
              disabled={Submit}
              style={{
                marginTop: 20,
                // width: 300,
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EditProfile;
