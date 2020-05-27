import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LocalAtm from "@material-ui/icons/LocalAtm";
import Event from "@material-ui/icons/Event";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Members from "views/Members/Members.js";
import Payments from "views/Payments/Payments.js";
import EventsMeetings from "views/EventsMeetings/EventsMeetings.js";
import NewsArticles from "views/NewsArticles/NewsArticles.js";
import GalleryPage from "views/Gallery/Gallery.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/members",
    name: "Members",
    icon: People,
    component: Members,
    layout: "/admin",
  },
  {
    path: "/payments",
    name: "Payments",
    icon: LocalAtm,
    component: Payments,
    layout: "/admin",
  },
  {
    path: "/events-meetings",
    name: "Events and Meetings",
    icon: Event,
    component: EventsMeetings,
    layout: "/admin",
  },
  {
    path: "/news-articles",
    name: "News and Articles",
    icon: LibraryBooks,
    component: NewsArticles,
    layout: "/admin",
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: PhotoLibrary,
    component: GalleryPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
