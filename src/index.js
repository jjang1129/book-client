import React from 'react';
import ReactDOM from 'react-dom/client';
import router from "./router";
import "./asset/reset.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvidver } from "./Components/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <AuthProvidver>
  <RouterProvider router={router} />
  </AuthProvidver>
  </QueryClientProvider>
);

