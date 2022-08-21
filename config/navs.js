import { AskATeacher, Dashboard, Forum, Kcpe, Learn } from "../assets";

export default [
  {
    name: "Learn",
    url: "/learn",
    inner: false,
    component: Learn,
  },
  {
    name: "KCPE revision",
    url: "/",
    inner: false,
    component: Kcpe,
  },
  {
    name: "Forum",
    url: "/",
    inner: false,
    component: Forum,
  },
  {
    name: "Ask a teacher",
    url: "/",
    inner: false,
    component: AskATeacher,
  },
  {
    name: "Dashboard",
    url: "/",
    inner: false,
    component: Dashboard,
  },
];
