import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import NewProducts from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/Mycart";
import Collection from "./pages/Collection";
import Notice from "./pages/Notice";
import About from "./pages/About";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NoticeDetail from "./pages/NoticeDetail";
import BoardWrite from "./components/BoardWrite";
import BoardEdit from "./components/BoardEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/products", element: <AllProducts /> },
      {
        path: "/products/new",
        element: (
          <ProtectedRoute requireAdmin>
            <NewProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/notice",
        element: <Notice />,
      },
      {
        path: "notice/:id",
        element: <NoticeDetail />,
      },
      {
        path: "/write",
        element: <BoardWrite />,
      },
      {
        path: "/edit",
        element: <BoardEdit />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/carts",
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
