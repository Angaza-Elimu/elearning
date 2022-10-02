import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { gradeReducer, settingsReducer, profileReducer, recommendationReducer, diagnosticsReducer, quizReducer, subtopicsReducer } from "./features";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "js-cookie";

const persistConfig = {
  key: "root",
  // storage,
  storage: new CookieStorage(Cookies),
};

const reducers = combineReducers({
  grade: gradeReducer,
  settings: settingsReducer,
  profile: profileReducer,
  recommendation: recommendationReducer,
  diagnostics: diagnosticsReducer,
  quiz: quizReducer,
  subtopics: subtopicsReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  middleware: [thunk],
  reducer: persistedReducer,
});
