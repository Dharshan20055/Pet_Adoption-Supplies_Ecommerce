import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartPage from "./components/buyer/CartPage";
import RequestForm from "./components/buyer/RequestForm";
import RequestStatus from "./components/buyer/RequestStatus";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/cart" element={<CartPage />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/requests" element={<RequestStatus />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;