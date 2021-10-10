import React, { useState, useEffect } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
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

// import EditIcon from "@material-ui/icons/Edit";
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

// import classnames from "classnames";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { eachDayOfInterval } from "date-fns";

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
const styles = (theme) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

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
  level = null,
  tasks = null,
  workflow = null,
  project = null;

let assignment_employee = "null",
  assignment_project = "null",
  assignment_type = "null",
  assignment_date_a = new Date(),
  assignment_date_b = new Date();

let users = null,
  expanded = [];

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [_assignment_date, set_assignment_date] = useState([
    new Date(),
    new Date(),
  ]);
  const [Name, setName] = useState("");
  // const [level, setlevel] = useState(null);

  const [ConfirmationModalVisibility, setConfirmationModalVisibility] =
    React.useState(false);
  const [EditModalVisibility, setEditModalVisibility] = React.useState(false);

  const [rows, setrows] = useState([
    {
      id: 1,
      Name: "Muhammad Adil",
      Email: "adilzubari852@gmail.com",
      Contact: "2309847983247",
      Role: "admin",
    },
  ]);

  const [AssignProjectModalVisibility, setAssignProjectModalVisibility] =
    useState(false);
  const ToggleAssignProjectModal = async (flag = false) => {
    if (flag) {
      // console.log(assignment_employee, assignment_project, assignment_type);
      let ListOfDatesOfProgress = Object.assign(
        {},
        eachDayOfInterval({
          start: assignment_date_a,
          end: assignment_date_b,
        })
      );
      let zz = {};
      Object.keys(ListOfDatesOfProgress).forEach((key) => {
        zz[ListOfDatesOfProgress[key]] = 0.0;
      });
      ListOfDatesOfProgress = zz;

      let req_obj = {
        Employee_id: assignment_employee,
        Project_id: assignment_project,
        TaskType: assignment_type,
        Date_A: assignment_date_a,
        Date_B: assignment_date_b,
      };
      console.log("Object Formulated for Project assignment =>", req_obj);
      console.log("Project assignment initiating ...");
      const Response = await axios.post("/workflow/create", req_obj);
      console.log("Response recieved", Response.data);
      console.log("Request successfull!!");

      console.log("Progress initiating with Empty Data ...");
      const _Response = await axios.post("/progress/create", {
        Workflow_id: Response.data,
        Progress: ListOfDatesOfProgress,
      });
      console.log("Response recieved", _Response.data);
      console.log("Request successfull!!");

      window.location.href = window.location.origin + "/#/admin/user/add";
      setTimeout(() => {
        window.location.href = window.location.origin + "/#/admin/workflow";
      }, 10);
    }
    setAssignProjectModalVisibility(
      AssignProjectModalVisibility ? false : true
    );
    set_assignment_date([new Date(), new Date()]);
    assignment_employee = "null";
    assignment_project = "null";
    assignment_type = "null";
    assignment_date_a = new Date();
    assignment_date_b = new Date();
  };

  const FindUserAndSetForEdit = () => {
    rows.forEach((row) => {
      if (row._id == SelectedUserID) {
        Role = row.Role;
        Level = row.Level_id;
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
      const req_body = {
        ...DataToModified,
        _id: SelectedUserID,
        Contact: document.getElementById("ContactToEdit").value,
        Email: document.getElementById("EmailToEdit").value,
        Level,
        Name: document.getElementById("NameToEdit").value,
        Role,
      };
      // console.log(req_body);
      // return;
      await axios
        .post("/user/edit", req_body)
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
    // console.log(SelectedUserID);
    // setConfirmationModalVisibility(false);
    // return;
    if (DeleteFlag) {
      console.log("Initiating Delete Request ...");
      await axios
        .post("/workflow/delete", {
          _id: SelectedUserID,
        })
        .then(() => {
          console.log("Workflow deleted from database ...");
          console.log("Request Successfull");
        })
        .catch((e) => {
          console.log("Failed from database ...");
          console.log("Request Failed");
        });

      await axios
        .post("/progress/delete", {
          Workflow_id: SelectedUserID,
        })
        .then(() => {
          console.log("Progress deleted from database ...");
          console.log("Request Successfull");
          window.location.href = window.location.origin + "/#/admin/user/add";
          setTimeout(() => {
            window.location.href = window.location.origin + "/#/admin/workflow";
          }, 10);
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
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div>
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
      field: "Project",
      headerName: "Project",
      width: 200,
      editable: false,
    },
    {
      field: "TaskType",
      headerName: "Task Type",
      width: 220,
      editable: false,
    },
    {
      field: "Date_A",
      headerName: "Assignment",
      width: 220,
      editable: false,
    },
    {
      field: "Date_B",
      headerName: "Deadline",
      width: 200,
      editable: false,
    },
    // {
    //   field: "Role",
    //   headerName: "Role",
    //   width: 100,
    //   editable: false,
    // },
    {
      Header: false,
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
        console.log("Requesting Tasks ...");
        const Tasks = await axios.get("/get/tasks");
        tasks = Tasks.data;
        console.log("tasks recieved and saved!", Tasks.data);

        console.log("Requesting levels ...");
        const _Response = await axios.get("/get/levels");
        // await setlevel(_Response.data);
        level = _Response.data;
        console.log("levels recieved and saved!", _Response.data);

        console.log("Requesting projects ...");
        const __Response = await axios.get("/get/projects");
        project = __Response.data;
        console.log("projects recieved and saved!", __Response.data);

        console.log("Requesting workflow ...");
        const ___Response = await axios.get("/get/workflow");
        workflow = ___Response.data.map((item) => {
          return {
            ...item,
            id: item._id,
            actions: item._id,
            Project: __Response.data.filter(
              (proj) => proj._id == item.Project_id
            )[0].ProjectName,
            Date_A:
              new Date(item.Date_A).toLocaleString("en-us", {
                month: "long",
              }) +
              " " +
              new Date(item.Date_A).getDate() +
              ", " +
              new Date(item.Date_A).getFullYear(),
            Date_B:
              new Date(item.Date_B).toLocaleString("en-us", {
                month: "long",
              }) +
              " " +
              new Date(item.Date_B).getDate() +
              ", " +
              new Date(item.Date_B).getFullYear(),
          };
        });
        console.log("workflow recieved and saved!", ___Response.data);

        console.log("Requesting Employees Information ...");
        let Response = await axios.get("/get/users/employee");
        Response.data = Response.data.map((user) => {
          return {
            ...user,
            actions: user._id,
            id: user._id,
            Level_id: user.Level,
            Level: FilterAndGetSpecificLevel(user.Level),
            WorkFlow: workflow.filter((item) => item.Employee_id == user._id),
          };
        });

        console.log("Response Recieved", Response.data);
        users = Response.data;
        setrows(Response.data);
        console.log("Request successfull!", Response.data);
      } catch (e) {
        console.log("Request, Failed", e);
      }
    })();
  }, []);

  // state = { expanded: false };

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

  const HeaderActions = () => {
    return (
      <div>
        <ButtonGroup disableElevation variant="outlined" size="small">
          <Button>Custom</Button>
          <Button>This Week</Button>
        </ButtonGroup>
        &nbsp; &nbsp; &nbsp;
        <ButtonGroup
          variant="outlined"
          size="small"
          title="Assign project to employee"
          onClick={() => ToggleAssignProjectModal()}
        >
          <Button>+</Button>
        </ButtonGroup>
      </div>
    );
  };

  const [expanded_signal, setexpanded_signal] = useState(false);

  const GenerateExpandArray = (id = null) => {
    let arr = [];
    for (let index = 0; index < rows.length; index++) expanded[index] = false;
    for (let index = 0; index < rows.length; index++)
      expanded[index] = index == id ? true : false;
    console.log(expanded);
    setexpanded_signal(false);
    setexpanded_signal(true);
    // arr.push(index == id ? true : false);
    // console.log(arr);
    // return;
    // setexpanded(arr);
  };
  const ListEmployees = () => {
    const code = [];
    for (let index = 0; index < rows.length; index++) {
      // console.log(rows[index].WorkFlow);
      code.push(
        <div>
          <Box>
            <CardHeader
              title={
                <Box component="span" color={theme.palette.gray[600]}>
                  {rows[index].Level}
                </Box>
              }
              subheader={rows[index].Name}
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
              <DataGrid
                columns={columns}
                rows={[...rows[index].WorkFlow]}
                hideFooter
                checkboxSelection={false}
                disableSelectionOnClick
                autoHeight
              />
            </CardContent>
          </Box>
        </div>
      );
    }

    GenerateExpandArray();

    return code;
  };

  return (
    <>
      {/* Add WorkFlow Modal */}
      {
        <div>
          <BootstrapDialog
            onClose={() => ToggleAssignProjectModal()}
            aria-labelledby="customized-dialog-title"
            open={AssignProjectModalVisibility}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={() => ToggleAssignProjectModal()}
              style={{ width: 550 }}
            >
              Assign Project
            </BootstrapDialogTitle>
            <DialogContent dividers style={{ height: 600 }}>
              <Select
                labelId="assignment_employee"
                id="assignment_employee"
                defaultValue={assignment_employee}
                label="Project"
                variant={"standard"}
                onChange={(e) => (assignment_employee = e.target.value)}
                style={{
                  borderColor: "white",
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <MenuItem value={"null"}>Select Employee</MenuItem>
                {users != null &&
                  (() => {
                    const code = [];
                    for (let index = 0; index < users.length; index++) {
                      code.push(
                        <MenuItem value={users[index]._id}>
                          {users[index].Name}
                        </MenuItem>
                      );
                    }
                    console.log("code", code);
                    return code;
                  })()}
              </Select>

              <Select
                labelId="assignment_project"
                id="assignment_project"
                defaultValue={assignment_project}
                label="Project"
                variant={"standard"}
                onChange={(e) => (assignment_project = e.target.value)}
                style={{
                  borderColor: "white",
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <MenuItem value={"null"}>Select Project</MenuItem>
                {project != null &&
                  (() => {
                    const code = [];
                    for (let index = 0; index < project.length; index++) {
                      code.push(
                        <MenuItem value={project[index]._id}>
                          {project[index].ProjectName}
                        </MenuItem>
                      );
                    }
                    console.log("code", code);
                    return code;
                  })()}
              </Select>

              <Select
                labelId="assignment_type"
                id="assignment_type"
                defaultValue={assignment_type}
                label="Type"
                variant={"standard"}
                onChange={(e) => (assignment_type = e.target.value)}
                style={{
                  borderColor: "white",
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <MenuItem value={"null"}>Select Task Type</MenuItem>
                {tasks != null &&
                  (() => {
                    const code = [];
                    for (let index = 0; index < tasks.length; index++) {
                      code.push(
                        <MenuItem value={tasks[index].TaskName}>
                          {tasks[index].TaskName}
                        </MenuItem>
                      );
                    }
                    console.log("code", code);
                    return code;
                  })()}
                {/* <MenuItem value={"Analysis"}>Analysis</MenuItem>
                <MenuItem value={"Design"}>Design</MenuItem>
                <MenuItem value={"Build"}>Build</MenuItem>
                <MenuItem value={"Testing"}>Testing</MenuItem>
                <MenuItem value={"Trainning"}>Trainning</MenuItem>
                <MenuItem value={"Support"}>Support</MenuItem>
                <MenuItem value={"Production"}>Production</MenuItem> */}
              </Select>

              <DateRangePicker
                onChange={(e) => {
                  assignment_date_a = e[0];
                  assignment_date_b = e[1];
                  set_assignment_date(e);
                }}
                value={_assignment_date}
                defaultValue={[new Date(), new Date()]}
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => ToggleAssignProjectModal(true)}>
                Assign Project
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      }
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
            {"Confirm Deleting the Assigned Task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              By Confirming, the assigned task will be permanently deleted and
              you'll not be able to restore the data associated with the task.
              <br />
              Note: It may effect the data.
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
                    Manage your Team, They will manage the workflow
                  </Box>
                }
                subheader="Workflow"
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
                <Box position="relative" minHeight={"100vh"}>
                  {rows &&
                    Object.entries(rows[0]).filter(
                      (item) => item[0] == "WorkFlow"
                    ).length == 1 &&
                    rows[0].WorkFlow.length >= 0 && <ListEmployees />}
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
