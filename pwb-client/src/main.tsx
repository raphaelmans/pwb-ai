import React from "react";
import ReactDOM from "react-dom/client";
import RootApp from "./root-app.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CameraPage from "./pages/camera-page.tsx";
import UploadPage from "./pages/upload-page.tsx";
import DashboardPage from "./pages/dashboard-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootApp />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/real-time",
        element: <CameraPage />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
