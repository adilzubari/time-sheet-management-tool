import React, { useState, useEffect } from "react";
// import React, { useEffect, useState } from "react";
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
// import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios.js";
import {
  endOfWeek,
  startOfWeek,
  isWithinInterval,
  eachDayOfInterval,
} from "date-fns";
import { useStateValue } from "../../StateProvider";

// core components
import Header from "components/Headers/Header.js";
// import EditIcon from "@material-ui/icons/Edit";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";

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

let Today = null;
let FirstDayOfTheWeek = null;
let LastDayOfTheWeek = null;
let DaysInTheWeek = null;
let SelectedWorkflowId = null;

let ProgressDumper = null;
let GrandTotal = 0;

// let ListOfEmployees = null;

function Dashboard() {
  const [{ UserProfile }, dispatch] = useStateValue();
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

  const GetValueOfRespectedInput = (index) => {
    try {
      return ProgressDumper.filter(
        (item) => item.Workflow_id == SelectedWorkflowId
      )[0].Progress[[DaysInTheWeek[index]]];
    } catch (e) {
      return 0;
    }
  };

  const RespectedCorresspondedExists = (index) => {
    try {
      return Object.entries(
        ProgressDumper.filter(
          (item) => item.Workflow_id == SelectedWorkflowId
        )[0].Progress
      ).filter((item) => item[0] == DaysInTheWeek[index]).length == 1
        ? true
        : false;
    } catch (e) {
      return false;
    }
  };

  const [EditModalVisibility, setEditModalVisibility] = React.useState(false);
  const handleEditOpen = (id) => {
    // console.log("its clicked");
    SelectedWorkflowId = id;
    setEditModalVisibility(EditModalVisibility ? false : true);
  };
  const handleEditClose = async (flag = false) => {
    if (flag) {
      Today = new Date();
      FirstDayOfTheWeek = startOfWeek(Today, { weekStartsOn: 1 });
      LastDayOfTheWeek = endOfWeek(Today, { weekStartsOn: 1 });
      DaysInTheWeek = eachDayOfInterval({
        start: FirstDayOfTheWeek,
        end: LastDayOfTheWeek,
      });
      let req_obj = {};
      Object.keys(DaysInTheWeek).forEach((key) => {
        // console.log(">>>>>>>>>>>", key);
        if (RespectedCorresspondedExists(key)) {
          req_obj["Progress." + DaysInTheWeek[key]] = document.getElementById(
            DaysInTheWeek[key]
          ).value;
        }
      });
      req_obj = {
        Workflow_id: SelectedWorkflowId,
        Progress: {
          ...req_obj,
        },
      };
      console.log("Object Formulated for Timesheet update", req_obj);
      // return;

      try {
        console.log("Request to update Progress Initiating ... ");
        const Response = await axios.post("/progress/update", req_obj);
        console.log("Response Recieved", Response.data);
        console.log("Request successfull");
        window.location.href = window.location.origin + "/#/employee/user/edit";
        setTimeout(() => {
          window.location.href =
            window.location.origin + "/#/employee/timesheet";
        }, 5);
      } catch (e) {
        console.log("Request Failed!", e);
      }
    }
    setEditModalVisibility(false);
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [SelectedUserIndex, setSelectedUserIndex] = useState(null);

  const [columns, setcolumns] = useState([
    // { field: "id", headerName: "Sr", width: 50 },
    // {
    //   field: "ProjectName",
    //   headerName: "Projects",
    //   width: 250,
    //   editable: false,
    // },
    {
      field: "ProjectName",
      headerName: "Projects",
      width: 250,
      editable: false,
    },
    {
      field: "mon",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "tue",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "wed",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "thu",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "fri",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "sat",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "sun",
      headerName: "MMM DD, YYYY",
      width: 110,
      editable: false,
    },
    {
      field: "Total",
      headerName: "Total",
      width: 180,
      editable: false,
    },
  ]);

  const [rows, setrows] = useState([
    // {
    //   id: 1,
    //   ProjectName: " • Vacation",
    //   mon: "8.00",
    //   tue: "0.00",
    //   wed: "0.00",
    //   thu: "0.00",
    //   fri: "0.00",
    //   sat: "0.00",
    //   sun: "0.00",
    //   Total: "8.00",
    // },
  ]);
  const [ListOfEmployees, setListOfEmployees] = useState(null);

  const getFormattedDate = (date) => {
    date = new Date(date).toDateString().split(" ");
    date.pop();
    date = date.join(" ");
    // console.log(date);
    return date;
  };

  const CalSumInArray = (Workflow_id) => {
    try {
      SelectedWorkflowId = Workflow_id;
      let sum = 0;
      DaysInTheWeek.forEach((day, index) => {
        sum += RespectedCorresspondedExists(index)
          ? GetValueOfRespectedInput(index) * 1
          : 0;
      });
      return sum;
    } catch (e) {
      return 0;
    }
  };

  const FormulateUserReport = async (id) => {
    try {
      Today = new Date();
      FirstDayOfTheWeek = startOfWeek(Today, { weekStartsOn: 1 });
      LastDayOfTheWeek = endOfWeek(Today, { weekStartsOn: 1 });
      DaysInTheWeek = eachDayOfInterval({
        start: FirstDayOfTheWeek,
        end: LastDayOfTheWeek,
      });

      console.log("Requesting Progress ...");
      let Progress = await axios.get("/get/progress");
      ProgressDumper = Progress.data;
      console.log("Progress successfully recieved!", Progress.data);

      console.log("Requesting Projects ...");
      let Projects = await axios.get("/get/projects");
      console.log("Projects successfully recieved!");

      console.log("Requesting Workflow ...");
      let Response = await axios.post("/get/workflow", {
        Employee_id: id,
      });
      console.log("Response Recieved", Response.data);
      GrandTotal = 0;
      Response.data = Response.data
        .filter((item) =>
          isWithinInterval(new Date(Today), {
            start: new Date(item.Date_A),
            end: new Date(item.Date_B),
          })
        )
        .map((item) => {
          GrandTotal += CalSumInArray(item._id);
          return {
            ...item,
            id: item._id,
            actions: {
              show: true,
              Workflow_id: item._id,
            },
            ProjectName:
              " • " +
              Projects.data.filter((proj) => proj._id == item.Project_id)[0]
                .ProjectName +
              " - " +
              item.TaskType,
            ...Progress.data.filter((prog) => prog.Workflow_id == item._id)[0]
              .Progress,
            Total: CalSumInArray(item._id),
          };
        });
      let zz = {};
      Object.keys(DaysInTheWeek).forEach((key, index) => {
        let col_sum = 0;
        Progress.data.forEach((work) => {
          SelectedWorkflowId = work.Workflow_id;
          if (
            Response.data.filter((item) => item._id == work.Workflow_id)
              .length == 0
          )
            return;
          col_sum += RespectedCorresspondedExists(index)
            ? GetValueOfRespectedInput(index) * 1
            : 0;
        });
        zz[DaysInTheWeek[key]] = col_sum;
      });
      DaysInTheWeek = zz;
      Response.data = [
        ...Response.data,
        {
          actions: {
            show: false,
            Workflow_id: null,
          },
          id: "kjasdhaslkh",
          ProjectName: "Total",
          ...zz,
          Total: GrandTotal,
        },
      ];
      console.log("Response Filtered", Response.data);
      setrows(Response.data);
      console.log("Request successfull!");
    } catch (e) {
      console.log("Request Failed!", e);
    }
  };

  useEffect(() => {
    (async () => {
      console.log("Days in the week =>", DaysInTheWeek);
      Today = new Date();
      FirstDayOfTheWeek = startOfWeek(Today, { weekStartsOn: 1 });
      LastDayOfTheWeek = endOfWeek(Today, { weekStartsOn: 1 });
      DaysInTheWeek = eachDayOfInterval({
        start: FirstDayOfTheWeek,
        end: LastDayOfTheWeek,
      });
      setcolumns([
        // {
        //   field: "actions",
        //   headerName: "",
        //   width: 80,
        //   editable: false,
        //   disableClickEventBubbling: true,
        //   renderCell: (params) => {
        //     // console.log("params", params);
        //     if (params.formattedValue === undefined) return;
        //     if (params.formattedValue.show) {
        //       return (
        //         <div>
        //           <Button
        //             variant="contained"
        //             style={{ padding: 7 }}
        //             onClick={() =>
        //               handleEditOpen(params.formattedValue.Workflow_id)
        //             }
        //           >
        //             <EditIcon />
        //           </Button>
        //         </div>
        //       );
        //     } else {
        //       return <p></p>;
        //     }
        //   },
        // },
        {
          field: "ProjectName",
          headerName: "Projects",
          width: 250,
          editable: false,
        },
        {
          field: DaysInTheWeek[0],
          headerName: getFormattedDate(DaysInTheWeek[0]),
          width: 110,
          editable: false,
        },
        {
          field: DaysInTheWeek[1],
          headerName: getFormattedDate(DaysInTheWeek[1]),
          width: 110,
          editable: false,
        },
        {
          field: DaysInTheWeek[2],
          headerName: getFormattedDate(DaysInTheWeek[2]),
          width: 110,
          editable: false,
        },
        {
          field: DaysInTheWeek[3],
          headerName: getFormattedDate(DaysInTheWeek[3]),
          width: 110,
          editable: false,
        },
        {
          field: DaysInTheWeek[4],
          headerName: getFormattedDate(DaysInTheWeek[4]),
          width: 110,
          editable: false,
        },
        {
          field: DaysInTheWeek[5],
          headerName: getFormattedDate(DaysInTheWeek[5]),
          width: 110,
          editable: false,
        },
        {
          field: DaysInTheWeek[6],
          headerName: getFormattedDate(DaysInTheWeek[6]),
          width: 110,
          editable: false,
        },
        {
          field: "Total",
          headerName: "Total",
          width: 180,
          editable: false,
        },
      ]);
      // console.log(DaysInTheWeek);
      try {
        console.log("Requesting Employees ...");
        let Employees = await axios.get("/get/users/employee");
        // ListOfEmployees = Employees.data;
        setListOfEmployees(Employees.data);
        console.log("Employees data successfully recieved!", Employees.data);

        FormulateUserReport(Employees.data[0]._id);
        setSelectedUserIndex(0);

        return;
        console.log("Requesting Progress ...");
        let Progress = await axios.get("/get/progress");
        ProgressDumper = Progress.data;
        console.log("Progress successfully recieved!");

        console.log("Requesting Projects ...");
        let Projects = await axios.get("/get/projects");
        console.log("Projects successfully recieved!");

        console.log("Requesting Workflow ...");
        let Response = await axios.post("/get/workflow", {
          Employee_id: UserProfile._id,
        });
        console.log("Response Recieved", Response.data);
        Response.data = Response.data
          .filter((item) =>
            isWithinInterval(new Date(Today), {
              start: new Date(item.Date_A),
              end: new Date(item.Date_B),
            })
          )
          .map((item) => {
            GrandTotal += CalSumInArray(item._id);
            return {
              ...item,
              id: item._id,
              actions: {
                show: true,
                Workflow_id: item._id,
              },
              ProjectName:
                " • " +
                Projects.data.filter((proj) => proj._id == item.Project_id)[0]
                  .ProjectName,
              ...Progress.data.filter((prog) => prog.Workflow_id == item._id)[0]
                .Progress,
              Total: CalSumInArray(item._id),
            };
          });
        let zz = {};
        Object.keys(DaysInTheWeek).forEach((key, index) => {
          let col_sum = 0;
          Progress.data.forEach((work) => {
            SelectedWorkflowId = work.Workflow_id;
            col_sum += RespectedCorresspondedExists(index)
              ? GetValueOfRespectedInput(index) * 1
              : 0;
          });
          zz[DaysInTheWeek[key]] = col_sum;
        });
        DaysInTheWeek = zz;
        Response.data = [
          ...Response.data,
          {
            actions: {
              show: false,
              Workflow_id: null,
            },
            id: "kjasdhaslkh",
            ProjectName: "Total",
            ...zz,
            Total: GrandTotal,
          },
        ];
        console.log("Response Filtered", Response.data);
        setrows(Response.data);
        console.log("Request successfull!");
      } catch (e) {
        console.log("Request, Failed", e);
      }
    })();
  }, []);

  const HeaderActions = () => {
    return (
      <div>
        {ListOfEmployees && SelectedUserIndex != null && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={SelectedUserIndex}
            label="Level / Designation"
            variant={"outlined"}
            onChange={(e) => {
              setSelectedUserIndex(e.target.value);
              FormulateUserReport(ListOfEmployees[e.target.value]._id);
            }}
            style={{
              borderColor: "white",
              backgroundColor: "white",
              color: "black",
              width: "100%",
              marginBottom: 20,
            }}
          >
            {(() => {
              {
                /* console.log(
                ">>>>>>>>>>>>>>>>>>>>>",
                ListOfEmployees[SelectedUserIndex]._id
              ); */
              }
              const code = [];
              for (let index = 0; index < ListOfEmployees.length; index++) {
                code.push(
                  <MenuItem value={index}>
                    {ListOfEmployees[index].Name}
                  </MenuItem>
                );
              }
              console.log("code", code);
              {
                /* setSelectedUserIndex */
              }
              return code;
            })()}
          </Select>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Edit Modal */}
      {DaysInTheWeek != null && ProgressDumper != null && (
        <div>
          {(() => {
            Today = new Date();
            FirstDayOfTheWeek = startOfWeek(Today, { weekStartsOn: 1 });
            LastDayOfTheWeek = endOfWeek(Today, { weekStartsOn: 1 });
            DaysInTheWeek = eachDayOfInterval({
              start: FirstDayOfTheWeek,
              end: LastDayOfTheWeek,
            });
            try {
              {
                /* console.log("======>", GetValueOfRespectedInput(0)); */
              }
              {
                /* RespectedCorresspondedExists(0);
              RespectedCorresspondedExists(1);
              RespectedCorresspondedExists(2);
              RespectedCorresspondedExists(3);
              RespectedCorresspondedExists(4);
              RespectedCorresspondedExists(5);
              RespectedCorresspondedExists(6); */
              }
            } catch (e) {
              console.log("Failed", e);
            }
            console.log("Day in the week", DaysInTheWeek);
          })()}
          <BootstrapDialog
            onClose={() => handleEditClose(false)}
            aria-labelledby="customized-dialog-title"
            open={EditModalVisibility}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={() => handleEditClose(false)}
            >
              Edit Timesheet
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {RespectedCorresspondedExists(0) && (
                <TextField
                  id={DaysInTheWeek[0]}
                  label={getFormattedDate(DaysInTheWeek[0])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(0)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
              {RespectedCorresspondedExists(1) && (
                <TextField
                  id={DaysInTheWeek[1]}
                  label={getFormattedDate(DaysInTheWeek[1])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(1)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
              {RespectedCorresspondedExists(2) && (
                <TextField
                  id={DaysInTheWeek[2]}
                  label={getFormattedDate(DaysInTheWeek[2])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(2)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
              {RespectedCorresspondedExists(3) && (
                <TextField
                  id={DaysInTheWeek[3]}
                  label={getFormattedDate(DaysInTheWeek[3])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(3)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
              {RespectedCorresspondedExists(4) && (
                <TextField
                  id={DaysInTheWeek[4]}
                  label={getFormattedDate(DaysInTheWeek[4])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(4)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
              {RespectedCorresspondedExists(5) && (
                <TextField
                  id={DaysInTheWeek[5]}
                  label={getFormattedDate(DaysInTheWeek[5])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(5)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
              {RespectedCorresspondedExists(6) && (
                <TextField
                  id={DaysInTheWeek[6]}
                  label={getFormattedDate(DaysInTheWeek[6])}
                  variant="outlined"
                  defaultValue={GetValueOfRespectedInput(6)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => handleEditClose(true)}>
                Update Timesheet
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
                    Weekly Individual Reports of the Employees
                  </Box>
                }
                subheader={
                  SelectedUserIndex != null
                    ? ListOfEmployees[SelectedUserIndex].Name
                    : "Loading ..."
                }
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
                action={<HeaderActions />}
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
