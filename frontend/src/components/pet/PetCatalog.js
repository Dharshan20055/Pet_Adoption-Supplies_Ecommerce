import React, { useEffect, useState } from 'react';
import { getAllPets, filterPets } from '../../services/PetService';

const PetCatalog = () => {
    const [pets, setPets] = useState([]);
    const [filters, setFilters] = useState({ type: '', breed: '', location: '' });

    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        try {
            const res = await getAllPets();
            setPets(res.data);
        } catch (error) {
            console.error("Error loading pets:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = async () => {
        try {
            const res = await filterPets(filters);
            setPets(res.data);
        } catch (error) {
            console.error("Error filtering pets:", error);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Pets</h2>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <input name="type" placeholder="Category (Dog/Cat)" className="p-3 border rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-purple-400" onChange={handleFilterChange} />
                <input name="breed" placeholder="Breed" className="p-3 border rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-purple-400" onChange={handleFilterChange} />
                <input name="location" placeholder="Location" className="p-3 border rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-purple-400" onChange={handleFilterChange} />
                <button onClick={applyFilters} className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition">Filter</button>
                <button onClick={loadPets} className="bg-gray-400 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-500 transition">Reset</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pets.map(pet => (
                    <div key={pet.pet_id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img src={pet.imageUrl || 'https://via.placeholder.com/300'} alt={pet.name} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
                            <p className="text-gray-500 text-sm mb-3">{pet.breed} • {pet.age} yrs</p>
                            <p className="text-gray-600 text-sm flex items-center mb-4">📍 {pet.location}</p>
                            <div className="flex justify-between items-center border-t pt-4">
                                <span className="text-lg font-bold text-green-600">
                                    {pet.price > 0 ? `$${pet.price}` : 'Free'}
                                </span>
                                {pet.license_id && (
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md font-semibold">Verified Seller</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {pets.length === 0 && (
                <div className="text-center text-gray-500 mt-10 text-xl">No pets found matching your criteria.</div>
            )}
        </div>
    );
};

export default PetCatalog;