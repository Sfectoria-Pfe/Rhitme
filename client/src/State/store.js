import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesState";
import passwordReducer from "./revealePasswordState";
import deleteReducer from "./deleteEmployeeState";
import sidebarReducer from "./sidebarState";
import addReducer from "./addEmployeeState";
import reportRdeucer from "./reportReply";

export default configureStore({
  reducer: {
    messages: messagesReducer,
    password: passwordReducer,
    delete: deleteReducer,
    sidebar: sidebarReducer,
    add: addReducer,
    report: reportRdeucer,
  },
});
