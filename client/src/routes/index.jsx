import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../components/Layout";
import AddPage from "../pages/AddPage";
import EditPage from "../pages/EditPage";
import HomePage from "../pages/HomePage";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/add",
        element: <AddPage />
      },
      {
        path: "/edit/:id",
        element: <EditPage />
      }
    ]
  },
  
]);

export default router