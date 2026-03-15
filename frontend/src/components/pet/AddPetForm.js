import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { addPet } from '../../services/PetService';

const AddPetForm = () => {
    const { token } = useContext(AuthContext);
    const [pet, setPet] = useState({
        name: '', breed: '', age: '', description: '', type: 'adoption',
        location: '', imageUrl: '', price: 0, license_id: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pet.type === 'sale' && !pet.license_id) {
            alert("Error: Commercial sales require a valid license ID.");
            return;
        }
        try {
            await addPet(pet, token);
            alert("Pet listed successfully!");
            setPet({ name: '', breed: '', age: '', description: '', type: 'adoption', location: '', imageUrl: '', price: 0, license_id: '' });
        } catch (error) {
            alert(error.response?.data || "Error adding pet");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">List a New Pet 🐾</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Pet Name" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                       value={pet.name} onChange={(e) => setPet({...pet, name: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Breed" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                           value={pet.breed} onChange={(e) => setPet({...pet, breed: e.target.value})} required />
                    <input type="number" placeholder="Age" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                           value={pet.age} onChange={(e) => setPet({...pet, age: e.target.value})} required />
                </div>
                <select className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                        value={pet.type} onChange={(e) => setPet({...pet, type: e.target.value})}>
                    <option value="adoption">Free Adoption</option>
                    <option value="sale">For Sale</option>
                </select>
                {pet.type === 'sale' && (
                    <>
                        <input type="number" placeholder="Price" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                               value={pet.price} onChange={(e) => setPet({...pet, price: e.target.value})} required />
                        <input type="text" placeholder="License ID (Required)" className="w-full p-3 border border-red-200 rounded-lg outline-none focus:ring-2 focus:ring-red-400" 
                               value={pet.license_id} onChange={(e) => setPet({...pet, license_id: e.target.value})} required />
                    </>
                )}
                <input type="text" placeholder="Location" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                       value={pet.location} onChange={(e) => setPet({...pet, location: e.target.value})} required />
                <textarea placeholder="Description" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                          value={pet.description} onChange={(e) => setPet({...pet, description: e.target.value})} />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300">
                    Submit Listing
                </button>
            </form>
        </div>
    );
};

export default AddPetForm;