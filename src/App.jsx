import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPlaces from "./places/containers/NewPlaces.jsx";
import Users from "./users/containers/Users.jsx";
import UpdatePlace from "./places/containers/UpdatePlace.jsx";
import YourPath from "./yourPath/yourPath.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/yourPath",
    element: <YourPath />,
  },
  {
    path: "/places",
    children: [
      {
        path: "new",
        element: <NewPlaces />,
      },
      {
        path: ":pid",
        element: <UpdatePlace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
