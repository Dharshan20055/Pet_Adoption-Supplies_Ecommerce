import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import Loading from "./components/common/Loading";

const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/auth/Home"))
// const BuyerDashboard = lazy(() => import("./components/buyer/BuyerDashboard"));
// const SellerDashboard = lazy(() => import("./components/seller/SellerDashboard"));
// const ChatBox = lazy(() => import("./components/chat/ChatBox"));

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Suspense fallback={<Loading />}>

        <Routes>
           <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/seller" element={<SellerDashboard />} />

          <Route path="/chat" element={<ChatBox />} /> */}

        </Routes>

      </Suspense>

    </BrowserRouter>

  );
}

export default App;