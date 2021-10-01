import React, { useState, useEffect } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
// import DataGrid from "@material-ui/core/Grid";
import Grid from "@material-ui/core/Grid";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios.js";

import { DataGrid } from "@mui/x-data-grid";

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              style={{ padding: 7 }}
              // onClick={() => setEditModalVisibility(true)}
            >
              <EditIcon />
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              style={{ padding: 7 }}
              // onClick={() => setConfirmationModalVisibility(true)}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
    { field: "id", headerName: "ID", width: 230 },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 220,
      editable: false,
    },
    {
      field: "Contact",
      headerName: "Contact",
      width: 200,
      editable: false,
    },
    {
      field: "Role",
      headerName: "Role",
      width: 100,
      editable: false,
    },
  ];

  const [rows, setrows] = useState([
    // {
    //   id: 1,
    //   Name: "Muhammad Adil",
    //   Email: "adilzubari852@gmail.com",
    //   Contact: "2309847983247",
    //   Role: "admin",
    // },
  ]);
  // 03181128631
  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting Users Information ...");
        let Response = await axios.get("/get/users");
        Response.data = Response.data.map((user) => {
          return { ...user, id: user._id };
        });
        console.log("Response Recieved", Response.data);
        setrows(Response.data);
        console.log("Request successfull!");
      } catch (e) {
        console.log("Request, Failed", e);
      }
    })();
  }, []);

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
          <Grid item xs={12} xl={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                title={
                  <Box component="span" color={theme.palette.gray[600]}>
                    (Admin / Report Viewers / Employees)
                  </Box>
                }
                subheader="Users"
                classes={{ root: classes.cardHeaderRoot }}
                titleTypographyProps={{
                  component: Box,
                  variant: "h6",
                  letterSpacing: ".0625rem",
                  marginBottom: ".25rem!important",
                  classes: {
                    root: classes.textUppercase,
                  },
                }}
                subheaderTypographyProps={{
                  component: Box,
                  variant: "h2",
                  marginBottom: "0!important",
                  color: "initial",
                }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="400px">
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection={false}
                      disableSelectionOnClick
                    />
                    {/* <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  /> */}
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>{" "}
      </Container>
    </>
  );
}

export default Dashboard;
