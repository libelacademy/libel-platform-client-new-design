import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.slice";
import generalReducer from "./general.sclie";
import adminReducer from "./admin.slice";
import instructorReducer from "./instructor.slice";
import studentReducer from "./student.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalReducer,
    admin: adminReducer,
    instructor: instructorReducer,
    student: studentReducer,
  },
})