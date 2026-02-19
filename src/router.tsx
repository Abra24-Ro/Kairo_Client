import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/layout/AppLayout";
import { DashBoardView } from "@/layout/views/DashBoardView";
import { CreateProjectView } from "@/layout/views/projects/CreateProjectView";
import { EditProjectView } from "@/layout/views/projects/EditProjectView";
import { ProjectDetailsView } from "./layout/views/projects/ProjectDetailsView";
import { AuthLayout } from "./layout/auth/AuthLayout";
import { LoginView } from "./layout/views/auth/LoginView";
import RegisterView from "./layout/views/auth/RegisterView";
import { ConfirmAccountView } from "./layout/views/auth/ConfirmAccountView";
import { RequestNewCodeView } from "./layout/views/auth/RequestNewCodeView";
import { ForgotPasswordView } from "./layout/views/auth/ForgotPasswordView";
import { NewPasswordView } from "./layout/views/auth/NewPasswordView";
import { ProjectTeamView } from "./layout/views/projects/ProjectTeamView";
import { ProfileView } from "./layout/views/profile/ProfileView";
import { ChangePasswordView } from "./layout/views/profile/ChangePasswordView";
import { ProfileLayout } from "./layout/ProfileLayout";
import { NotFoundView } from "./layout/views/404/NotFoundView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashBoardView />,
      },
      {
        path: "projects/create",
        element: <CreateProjectView />,
      },
      {
        path: "projects/:projectId/edit",
        element: <EditProjectView />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetailsView />,
      },
      {
        path: "projects/:projectId/team",
        element: <ProjectTeamView />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <ProfileView />,
          },
          {
            path: "change-password",
            element: <ChangePasswordView />,
          },
        ],
      },
    ],
  },
  
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
      {
        path: "confirm-account",
        element: <ConfirmAccountView />,
      },
      {
        path: "request-code",
        element: <RequestNewCodeView />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordView />,
      },
      {
        path: "new-password",
        element: <NewPasswordView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  }
]);
