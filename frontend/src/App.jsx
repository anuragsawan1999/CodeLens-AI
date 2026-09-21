import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
              <Route

path="/profile"

element={

<PrivateRoute>

<Layout>

<Profile/>

</Layout>

</PrivateRoute>

}

/>
        <Route
          path="/analyze"
          element={
            <PrivateRoute>
              <Layout>
                <Analyze />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <Layout>
                <History />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}