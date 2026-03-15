import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PetCatalog from './components/pet/PetCatalog'; 
import AddPetForm from './components/pet/AddPetForm';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Nav bar for easy switching while testing */}
        <nav style={{ padding: '20px', background: '#4f46e5', color: 'white', display: 'flex', gap: '20px' }}>
          <a href="/petcatalog" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Browse Pets</a>
          <a href="/add-pet" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>List a Pet</a>
        </nav>

        <Routes>
          
          <Route path="/" element={<Navigate to="/petcatalog" />} />
          
          <Route path="/petcatalog" element={<PetCatalog />} />
          
          <Route path="/add-pet" element={<AddPetForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;