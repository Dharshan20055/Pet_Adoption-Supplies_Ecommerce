import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import Loading from "./components/common/Loading";
import ProtectedRoute from "./components/common/ProtectedRoute";

const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/auth/Home"));
const Profile = lazy(() => import("./components/auth/Profile"));
// const PetCatalog = lazy(() => import("./components/pet/PetCatalog"));
// const AddPetForm = lazy(() => import("./components/pet/AddPetForm"));
// const BuyerDashboard = lazy(() => import("./components/buyer/BuyerDashboard"));
// const SellerDashboard = lazy(() => import("./components/seller/SellerDashboard"));
// const ChatBox = lazy(() => import("./components/chat/ChatBox"));
const Subscribe        = lazy(() => import("./components/auth/Subscribe"));
const SubscribeSuccess = lazy(() => import("./components/auth/SubscribeSuccess"));
const SubscribeCancel  = lazy(() => import("./components/auth/SubscribeCancel"));


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Suspense fallback={<Loading />}>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/catalog" element={<PetCatalog />} />
          <Route path="/add-pet" element={<AddPetForm />} /> */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/subscribe"
            element={
              <ProtectedRoute>
                <Subscribe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscribe/success"
            element={
              <ProtectedRoute>
                <SubscribeSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscribe/cancel"
            element={
              <ProtectedRoute>
                <SubscribeCancel />
              </ProtectedRoute>
            }
          />


        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

export default App;