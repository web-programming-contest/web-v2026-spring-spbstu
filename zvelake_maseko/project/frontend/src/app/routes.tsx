import { createBrowserRouter } from "react-router";
import { IndexPage } from "./components/IndexPage"
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ProfileEditPage } from "./components/ProfileEditPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: IndexPage
    },
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/register",
      Component: RegisterPage,
    },
    {
      path: "/profile",
      Component: ProfileEditPage,
    },
]);
