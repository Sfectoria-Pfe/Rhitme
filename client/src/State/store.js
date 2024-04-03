import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesState";
import passwordReducer from "./revealePasswordState";
import deleteReducer from "./deleteEmployeeState";
import sidebarReducer from "./sidebarState";
import addReducer from "./addEmployeeState";
import reportRdeucer from "./reportReply";
import chatReducer from "./chatState";
import offerReducer from "./OffersSlice";
import employeesReducer from "./EmployeesState";
import employeeReducer from "./EmployeeState";
import departmentReducer from "./DepartmentState";
import absenceReducer from "./AbsenceState";
import departedEmployeesReducer from "./DepartedEmployeesState";
import candidateReducer from "./CandidateState";
import windowsReducer from "./WindowsStates";

export default configureStore({
  reducer: {
    messages: messagesReducer,
    password: passwordReducer,
    delete: deleteReducer,
    sidebar: sidebarReducer,
    add: addReducer,
    report: reportRdeucer,
    chat: chatReducer,
    offer: offerReducer,
    employees: employeesReducer,
    employee: employeeReducer,
    department: departmentReducer,
    absence: absenceReducer,
    departedEmployees: departedEmployeesReducer,
    candidate: candidateReducer,
    windows: windowsReducer,
  },
});
