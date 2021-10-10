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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { styled } from "@mui/material/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// import Typography from "@mui/material/Typography";

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import { TextField } from "@material-ui/core";
const useStyles = makeStyles(componentStyles);

let SelectedUserID = null,
  DataToModified = null,
  SelectedUserModifiedData = {
    Name: "",
    Email: "",
    Contact: "",
    Level: "",
    Role: "",
  },
  Role = "",
  Level = "",
  Site = "",
  level = null;

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [Name, setName] = useState("");
  // const [level, setlevel] = useState(null);

  const [ConfirmationModalVisibility, setConfirmationModalVisibility] =
    React.useState(false);
  const [EditModalVisibility, setEditModalVisibility] = React.useState(false);

  const [rows, setrows] = useState([
    // {
    //   id: 1,
    //   Name: "Muhammad Adil",
    //   Email: "adilzubari852@gmail.com",
    //   Contact: "2309847983247",
    //   Role: "admin",
    // },
  ]);

  const FindUserAndSetForEdit = () => {
    rows.forEach((row) => {
      if (row._id == SelectedUserID) {
        // console.log(row);
        Role = row.Role;
        Level = row.Level_id;
        Site = Object.keys(row).includes("Site") ? row.Site : "onsite";
        DataToModified = row;
      }
    });
  };

  const SelectionForEdit = (id) => {
    SelectedUserID = id;
    FindUserAndSetForEdit();
    setEditModalVisibility(true);
  };
  const CancelingSelectionForEdit = async (EditFlag = false) => {
    if (EditFlag) {
      console.log("Initiating Edit Request ...");
      // console.log({
      //   ...DataToModified,
      //   _id: SelectedUserID,
      //   Contact: document.getElementById("ContactToEdit").value,
      //   Email: document.getElementById("EmailToEdit").value,
      //   Level,
      //   Name: document.getElementById("NameToEdit").value,
      //   Role,
      // });
      // return;
      await axios
        .post("/user/edit", {
          ...DataToModified,
          _id: SelectedUserID,
          Contact: document.getElementById("ContactToEdit").value,
          Email: document.getElementById("EmailToEdit").value,
          Level,
          Name: document.getElementById("NameToEdit").value,
          Role,
        })
        .then(() => {
          console.log("Success from database ...");
          // setrows(rows.filter((user) => user._id != SelectedUserID));
          // SelectedUserID = null;
          window.location.href = window.location.origin + "/#/admin/levels";
          setTimeout(() => {
            window.location.href = window.location.origin + "/#/admin/users";
          }, 50);
          // window.location.reload();
          console.log("Request Successfull");
        })
        .catch((e) => {
          console.log("Failed from database ...");
          console.log("Request Failed");
        });
    }

    SelectedUserID = null;
    DataToModified = null;
    Role = "";
    Level = "";

    setEditModalVisibility(false);
  };

  const SelectionForDelete = (id) => {
    SelectedUserID = id;
    setConfirmationModalVisibility(true);
  };
  const CancelingSelectionForDelete = async (DeleteFlag = false) => {
    if (DeleteFlag) {
      console.log("Initiating Delete Request ...");
      await axios
        .post("/user/delete", {
          _id: SelectedUserID,
        })
        .then(() => {
          console.log("Success from database ...");
          setrows(rows.filter((user) => user._id != SelectedUserID));
          SelectedUserID = null;
          console.log("Request Successfull");
        })
        .catch((e) => {
          console.log("Failed from database ...");
          console.log("Request Failed");
        });
    }
    setConfirmationModalVisibility(false);
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
              onClick={() => SelectionForEdit(params.formattedValue)}
            >
              <EditIcon />
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              style={{ padding: 7 }}
              onClick={() => SelectionForDelete(params.formattedValue)}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
    // { field: "id", headerName: "ID", width: 230 },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "Level",
      headerName: "Designation / Level",
      width: 220,
      editable: false,
    },
    {
      field: "Site",
      headerName: "On Site / Off Shore",
      width: 150,
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

  const FilterAndGetSpecificLevel = (id) => {
    // console.log(id);
    if (level == null) return;
    let a = "";
    console.log("matching ...");
    for (let zz = 0; zz < level.length; zz++) {
      if (level[zz]._id == id) {
        console.log("matched!");
        a = level[zz].LevelName;
        zz = level.length;
      }
    }
    // console.log(a);
    return a;
  };

  // 03181128631
  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting levels ...");
        const _Response = await axios.get("/get/levels");
        // await setlevel(_Response.data);
        level = _Response.data;
        console.log("levels recieved and saved!", _Response.data);

        console.log("Requesting Users Information ...");
        let Response = await axios.get("/get/users");
        Response.data = Response.data.map((user) => {
          return {
            ...user,
            actions: user._id,
            id: user._id,
            Level_id: user.Level,
            Level: FilterAndGetSpecificLevel(user.Level),
          };
        });
        console.log("Response Recieved", Response.data);
        setrows(Response.data);
        console.log("Request successfull!");
      } catch (e) {
        console.log("Request, Failed", e);
      }
    })();
  }, []);

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

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      {/* Edit Modal */}
      {DataToModified != null && (
        <div>
          <BootstrapDialog
            onClose={() => CancelingSelectionForEdit(false)}
            aria-labelledby="customized-dialog-title"
            open={EditModalVisibility}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={() => CancelingSelectionForEdit(false)}
            >
              Edit User
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <TextField
                label="Name"
                variant="outlined"
                id="NameToEdit"
                defaultValue={DataToModified.Name}
                // value={Name}
                // value={DataToModified.Name}
                // onChange={(e) => setName(e.target.value)}
                // onChange={(e) =>
                //   (SelectedUserModifiedData.Name = e.target.value)
                // }
                style={{ width: "100%", marginBottom: 20 }}
              />

              <TextField
                label="Email"
                variant="outlined"
                id="EmailToEdit"
                defaultValue={DataToModified.Email}
                // value={DataToModified.Email}
                // onChange={(e) =>
                //   (SelectedUserModifiedData.Email = e.target.value)
                // }
                style={{ width: "100%", marginBottom: 20 }}
              />

              <TextField
                label="Contact"
                variant="outlined"
                id="ContactToEdit"
                defaultValue={DataToModified.Contact}
                // value={DataToModified.Contact}
                // onChange={(e) =>
                //   (SelectedUserModifiedData.Contact = e.target.value)
                // }
                style={{ width: "100%", marginBottom: 20 }}
              />

              <Select
                id="SiteToEdit"
                defaultValue={Site}
                label="Level / Designation"
                variant={"outlined"}
                onChange={(e) => (Site = e.target.value)}
                style={{
                  borderColor: "white",
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <MenuItem value="onsite">On Site</MenuItem>
                <MenuItem value="offshore">Offshore</MenuItem>
              </Select>

              <Select
                labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // value={DataToModified.Level}
                id="LevelToEdit"
                defaultValue={Level == undefined ? 0 : Level}
                label="Level / Designation"
                variant={"outlined"}
                onChange={(e) => (Level = e.target.value)}
                style={{
                  borderColor: "white",
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <MenuItem value={0}>Select Leve/Designation</MenuItem>
                {level &&
                  (() => {
                    const code = [];
                    for (let index = 0; index < level.length; index++) {
                      code.push(
                        <MenuItem value={level[index]._id}>
                          {level[index].LevelName}
                        </MenuItem>
                      );
                    }
                    console.log("code", code);
                    return code;
                  })()}
              </Select>

              <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="radio-buttons-group"
                  id="RoleToEdit"
                  defaultValue={DataToModified.Role}
                  // value={DataToModified.Role}
                  onChange={(e) => (Role = e.target.value)}
                >
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    // disabled={Submit}
                    label="Employee"
                    variant="contained"
                  />
                  <FormControlLabel
                    value="viewer"
                    control={<Radio />}
                    // disabled={Submit}
                    label="Report Viewer"
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    // disabled={Submit}
                    label="Admin"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => CancelingSelectionForEdit(true)}>
                Save changes
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      )}
      {/* Confirmation Modal */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={ConfirmationModalVisibility}
          onClose={CancelingSelectionForDelete}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Confirm Deleting the User?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              By Confirming, the user will be permanently deleted and you'll not
              be able to restore the data associated with the user.
              <br />
              Note: It may effect the projects that are assigned to the user.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => CancelingSelectionForDelete(false)}
            >
              No, Don't Delete!
            </Button>
            <Button onClick={() => CancelingSelectionForDelete(true)} autoFocus>
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
                <Box position="relative">
                  <div style={{ width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      // pageSize={5}
                      // rowsPerPageOptions={[5]}
                      autoHeight
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
