import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPlaces from "./places/containers/NewPlaces.jsx";
import Users from "./users/containers/Users.jsx";
import UpdatePlace from "./places/containers/UpdatePlace.jsx";
import YourPath from "./yourPath/yourPath.jsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";

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
    path: "/places",
    children: [
      {
        path: "new",
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
        path: ":pid",
        element: (
          <>
            <MainNavigation />
            <main>
              <UpdatePlace />
            </main>
          </>
        ),
      },
    ],
  },
  {
    path: "/:pid/places",
    element: (
      <>
        <MainNavigation />
        <main>
          <UpdatePlace />{" "}
        </main>
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
