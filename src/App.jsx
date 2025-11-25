import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import Footer from "./components/Footer";
import { AuthProvide } from "./context/authContex";

function App() {
  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className="min-h-screen max-w-5xl mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;
