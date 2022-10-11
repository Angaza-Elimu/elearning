import { AskATeacher, Dashboard, Forum, Kcpe, Learn } from "../assets";

export default (learningLevel) => [
  {
    name: "Learn",
    url: "/learn",
    inner: false,
    component: Learn,
  },
  (() =>
    learningLevel?.toLowerCase() === "primary"
      ? {
          name: "KCPE Revision",
          url: "/revision",
          inner: false,
          component: Kcpe,
        }
      : {
          name: "KCSE Revision",
          url: "/revision",
          inner: false,
          component: Kcpe,
        })(),
  {
    name: "Forum",
    url: "/wip/forum",
    inner: false,
    component: Forum,
  },
  {
    name: "Ask a teacher",
    url: "/wip/askateacher",
    inner: false,
    component: AskATeacher,
  },
  {
    name: "Dashboard",
    url: "/wip/dashboard",
    inner: false,
    component: Dashboard,
  },
];
