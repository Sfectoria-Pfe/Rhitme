import "./App.css";
import Login from "./Pages/Login/Login";
import Employees from "./Pages/Employees/Employees";
import Home from "./Pages/Home/Home";
import EmployeeInfos from "./Pages/EmployeeInfos/EmployeeInfos";
import LandingPage from "./Pages/LandingPage/LandingPage";
import JobOffers from "./Pages/JobOffers/JobOffers";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Reports from "./Pages/Reports/Reports";
import MainLayout from "./Layouts/MainLayout";
import ReportDetails from "./Pages/Reports/ReportDetails";
import NotFound from "./Pages/NotFound/NotFound";
import Personal from "./Pages/EmployeeInfos/EmployeeInfosPages/Personal";
import Performance from "./Pages/EmployeeInfos/EmployeeInfosPages/Performance";
import Job from "./Pages/EmployeeInfos/EmployeeInfosPages/Job";
import Recruitment from "./Pages/Recruitment/Recruitment";
import Candidates from "./Pages/Recruitment/Candidates";
import Departments from "./Pages/Departments/Departments";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="joboffers" element={<JobOffers />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="departments" element={<Departments />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employeeinfos/:id" element={<EmployeeInfos />}>
          <Route index element={<Job />} />
          <Route path="personal" element={<Personal />} />
          <Route path="performance" element={<Performance />} />
        </Route>
        <Route path="reports">
          <Route index element={<Reports />} />
          <Route path="reportdetails/:id" element={<ReportDetails />} />
        </Route>
        <Route path="recruitment">
          <Route index element={<Recruitment />} />
          <Route path=":id" element={<Candidates />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
