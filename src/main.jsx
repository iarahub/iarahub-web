import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from './contexts/AuthContext';
import { Amplify } from '@aws-amplify/core';
import awsConfig from './config/cognito';

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);