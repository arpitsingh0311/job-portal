import { Button } from "@/components/ui/button";
import Navbar from "./components/components_lite/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login.jsx";
import Signup from "./components/authentication/Signup.jsx";
import Home from "./components/components_lite/Home.jsx";
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy.jsx";
import TermsOfService from "./components/components_lite/TermOfService.jsx";
import Jobs from "./components/components_lite/Jobs.jsx";
import Browse from "./components/components_lite/Browse.jsx";
import Profile from "./components/components_lite/Profile.jsx";
import Description from "./components/components_lite/Description.jsx";
import Companies from "./components/adminComponents/Companies.jsx";
import CompanyCreate from "./components/adminComponents/CompanyCreate.jsx";
import CompanySetup from "./components/adminComponents/CompanySetup.jsx";
import AdminJobs from "./components/adminComponents/AdminJobs.jsx";
import PostJob from "./components/adminComponents/PostJob";
import Applicants from "./components/adminComponents/Applicants";
import ProtectedRoute from "./components/adminComponents/ProtectedRoutes";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/privacyPolicy", element: <PrivacyPolicy /> },
  { path: "/tos", element: <TermsOfService /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
  { path: "/description/:id", element: <Description /> },
  // admin
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/post",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
