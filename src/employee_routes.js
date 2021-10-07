// core components
// import Dashboard from "views/admin/Dashboard.js";
// import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
// import Maps from "views/admin/Maps.js";
// import Profile from "views/admin/Profile.js";
// import Register from "views/auth/Register.js";
// import Tables from "views/admin/Tables.js";
// @material-ui/icons components
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Dns from "@material-ui/icons/Dns";
// import FlashOn from "@material-ui/icons/FlashOn";
// import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
// import Grain from "@material-ui/icons/Grain";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Palette from "@material-ui/icons/Palette";
// import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import VpnKey from "@material-ui/icons/VpnKey";
// import PeopleAltTwoTone from "@material-ui/icons/PeopleAltTwoTone";
import CardMembershipTwoTone from "@material-ui/icons/CardMembershipTwoTone";
import DashboardTwoTone from "@material-ui/icons/DashboardTwoTone";
// import FileCopyTwoTone from "@material-ui/icons/FileCopyTwoTone";
import AccountCircleTwoTone from "@material-ui/icons/AccountCircleTwoTone";

// Imports By Lughut
// import Users from "pages/admin/Users.js";
import TimeSheet from "pages/employee/TimeSheet.js";
import Levels from "pages/employee/Levels.js";
import WBSCodes from "pages/employee/WBSCodes.js";
// import AddNewUser from "pages/admin/AddNewUser.js";
import EditProfile from "pages/admin/EditProfile.js";
// import AddNewLevel from "pages/admin/AddNewLevel.js";
// import AddNewWBSCode from "pages/admin/AddNewWBSCode.js";

// var routes = [
//   {
//     href: "#pablo",
//     name: "Upgrade to pro",
//     icon: FlashOn,
//     upgradeToPro: true,
//   },
//   {
//     path: "/index",
//     name: "Dashboard",
//     icon: Tv,
//     iconColor: "Primary",
//     component: Dashboard,
//     layout: "/employee",
//   },
//   {
//     path: "/icons",
//     name: "Icons",
//     icon: Grain,
//     iconColor: "Primary",
//     component: Icons,
//     layout: "/employee",
//   },
//   {
//     path: "/maps",
//     name: "Maps",
//     icon: LocationOn,
//     iconColor: "Warning",
//     component: Maps,
//     layout: "/employee",
//   },
//   {
//     path: "/user-profile",
//     name: "User Profile",
//     icon: Person,
//     iconColor: "WarningLight",
//     component: Profile,
//     layout: "/employee",
//   },
//   {
//     path: "/tables",
//     name: "Tables",
//     icon: FormatListBulleted,
//     iconColor: "Error",
//     component: Tables,
//     layout: "/employee",
//   },
//   {
//     path: "/login",
//     name: "Login",
//     icon: VpnKey,
//     iconColor: "Info",
//     component: Login,
//     layout: "/auth",
//   },
//   {
//     path: "/register",
//     name: "Register",
//     icon: AccountCircle,
//     iconColor: "ErrorLight",
//     component: Register,
//     layout: "/auth",
//   },
//   {
//     divider: true,
//   },
//   {
//     title: "Documentation",
//   },
//   {
//     href: "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
//     name: "Getting started",
//     icon: FlashOn,
//   },
//   {
//     href: "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
//     name: "Foundation",
//     icon: Palette,
//   },
//   {
//     href: "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
//     name: "Components",
//     icon: Dns,
//   },
// ];

var routes = [
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: PeopleAltTwoTone,
  //   iconColor: "Primary",
  //   component: Users,
  //   layout: "/employee",
  // },
  {
    path: "/timesheet",
    name: "Time Sheet",
    icon: CardMembershipTwoTone,
    iconColor: "Info",
    component: TimeSheet,
    layout: "/employee",
  },
  {
    path: "/levels",
    name: "Levels",
    icon: CardMembershipTwoTone,
    iconColor: "Warning",
    component: Levels,
    layout: "/employee",
  },
  {
    path: "/wbs_codes",
    name: "Projects",
    icon: DashboardTwoTone,
    iconColor: "WarningLight",
    component: WBSCodes,
    layout: "/employee",
  },
  {
    path: "/master_data",
    name: "Master Data",
    icon: Tv,
    iconColor: "Info",
    component: WBSCodes,
    layout: "/employee",
  },
  {
    divider: true,
  },
  {
    title: "Others",
  },
  // {
  //   path: "/user/add",
  //   name: "Add New User",
  //   icon: PeopleAltTwoTone,
  //   // iconColor: "Primary",
  //   component: AddNewUser,
  //   layout: "/employee",
  // },
  {
    path: "/user/edit",
    name: "Edit Profile",
    icon: AccountCircleTwoTone,
    // iconColor: "Primary",
    component: EditProfile,
    layout: "/employee",
  },
  // {
  //   path: "/level/add",
  //   name: "Add New Level",
  //   icon: CardMembershipTwoTone,
  //   // iconColor: "Primary",
  //   component: AddNewLevel,
  //   layout: "/employee",
  // },
  // {
  //   path: "/wbs/add",
  //   name: "Add New WBS Code",
  //   icon: FileCopyTwoTone,
  //   // iconColor: "Primary",
  //   component: AddNewWBSCode,
  //   layout: "/employee",
  // },
  {
    path: "/",
    name: "Logout",
    icon: VpnKey,
    component: Login,
    layout: "/auth",
  },
];
export default routes;
