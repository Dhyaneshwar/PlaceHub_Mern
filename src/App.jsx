import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPlaces from "./places/containers/NewPlaces.jsx";
import Users from "./users/containers/Users.jsx";
import YourPath from "./yourPath/yourPath.jsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";
import UserPlaces from "./places/containers/UserPlaces.jsx";
import UpdatePlaces from "./places/containers/UpdatePlaces.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainNavigation />
        <main>
          <Users />
        </main>
      </>
    ),
  },
  {
    path: "/yourPath",
    element: (
      <>
        <MainNavigation />
        <main>
          <YourPath />
        </main>
      </>
    ),
  },
  {
    path: "/places/new",
    element: (
      <>
        <MainNavigation />
        <main>
          <NewPlaces />
        </main>
      </>
    ),
  },
  {
    path: "/:userid/places",
    element: (
      <>
        <MainNavigation />
        <main>
          <UserPlaces />
        </main>
      </>
    ),
  },
  {
    path: "/places/:placeid",
    element: (
      <>
        <MainNavigation />
        <main>
          <UpdatePlaces />
        </main>
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
