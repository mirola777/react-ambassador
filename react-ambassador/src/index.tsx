import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { configureStore } from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = "http://35.193.105.109/api/ambassador/";
axios.defaults.withCredentials = true;
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
