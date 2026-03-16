import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import Loading from "./components/common/Loading";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PetCatalog from './components/pet/PetCatalog'; 
import AddPetForm from './components/pet/AddPetForm';

const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/auth/Home"));
const Profile = lazy(() => import("./components/auth/Profile"));
// const PetCatalog = lazy(() => import("./components/pet/PetCatalog"));
// const AddPetForm = lazy(() => import("./components/pet/AddPetForm"));
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
            <Route path="/" element={<Navigate to="/petcatalog" />} />
          
          <Route path="/petcatalog" element={<PetCatalog />} />
          
          <Route path="/add-pet" element={<AddPetForm />} />
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

        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

export default App;