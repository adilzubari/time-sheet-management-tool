import React, { useEffect, useState } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
// import DataGrid from "@material-ui/core/Grid";
import Grid from "@material-ui/core/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import { styled } from "@mui/material/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@mui/material/Typography";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios.js";

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import { TextField } from "@material-ui/core";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            float: "right",
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [ConfirmationModalVisibility, setConfirmationModalVisibility] =
    React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setConfirmationModalVisibility(true);
  };
  const handleClose = () => {
    setConfirmationModalVisibility(false);
  };

  const [EditModalVisibility, setEditModalVisibility] = React.useState(false);
  const handleEditOpen = () => {
    setEditModalVisibility(true);
  };
  const handleEditClose = () => {
    setEditModalVisibility(false);
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

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
              onClick={() => setEditModalVisibility(true)}
            >
              <EditIcon />
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              style={{ padding: 7 }}
              onClick={() => setConfirmationModalVisibility(true)}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
    { field: "id", headerName: "Sr", width: 50 },
    {
      field: "LevelName",
      headerName: "Level Name",
      width: 170,
      editable: false,
    },
    {
      field: "Level",
      headerName: "Level",
      width: 130,
      editable: false,
    },
    {
      field: "Type",
      headerName: "Type",
      width: 120,
      editable: false,
    },

    {
      field: "Designation",
      headerName: "Designation",
      width: 200,
      editable: false,
    },

    {
      field: "OffShorePerHr",
      headerName: "OffShore Per Hr",
      width: 150,
      editable: false,
    },

    {
      field: "OnSitePerHr",
      headerName: "On Site Per Hr",
      width: 150,
      editable: false,
    },
  ];

  const [rows, setrows] = useState([
    // {
    //   id: 1,
    //   LevelName: "Level 1-Trainee",
    //   Level: "Level 1",
    //   Type: "Base",
    //   Designation: "Trainee",
    //   OffShorePerHr: "9.75",
    //   OnSitePerHr: "9.75",
    // },
  ]);

  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting Levels List ...");
        let Response = await axios.get("/get/levels");
        Response.data = Response.data.map((list) => {
          return { ...list, id: list._id };
        });
        console.log("Response Recieved", Response.data);
        setrows(Response.data);
        console.log("Request successfull!");
      } catch (e) {
        console.log("Request, Failed", e);
      }
    })();
  }, []);

  return (
    <>
      {/* Edit Modal */}
      <div>
        <BootstrapDialog
          onClose={handleEditClose}
          aria-labelledby="customized-dialog-title"
          open={EditModalVisibility}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleEditClose}
          >
            Edit Level
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <TextField
              label="Level Name"
              variant="outlined"
              style={{ width: "100%", marginBottom: 20 }}
            />

            <TextField
              label="Level"
              variant="outlined"
              style={{ width: "100%", marginBottom: 20 }}
            />

            <TextField
              label="Type"
              variant="outlined"
              style={{ width: "100%", marginBottom: 20 }}
            />

            <TextField
              label="Designation"
              variant="outlined"
              style={{ width: "100%", marginBottom: 20 }}
            />

            <TextField
              label="OffShore Per Hr"
              variant="outlined"
              style={{ width: "100%", marginBottom: 20 }}
            />

            <TextField
              label="On Site Per Hr"
              variant="outlined"
              style={{ width: "100%", marginBottom: 20 }}
            />
            <Typography gutterBottom>
              These changes will be automatically made to all the users that are
              assigned this level.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleEditClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      {/* Confirmation Modal */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={ConfirmationModalVisibility}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Confirm Deleting the Level?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              By Confirming, the level will be permanently deleted and you'll
              not be able to restore it.
              <br />
              Note: It may effect the users that are assigned the same level.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              No, Don't Delete!
            </Button>
            <Button onClick={handleClose} autoFocus>
              Confrim
            </Button>
          </DialogActions>
        </Dialog>
      </div>

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
                    <a href={window.location.origin + "/#/admin/wbs_codes"}>
                      + Add New Level
                    </a>
                  </Box>
                }
                subheader="Levels"
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
                <Box position="relative" height="600px">
                  <div style={{ height: 600, width: "100%" }}>
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
