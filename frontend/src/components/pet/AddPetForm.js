import React, { useState } from 'react';
import { addPet } from '../../services/PetService';
// import './AddPetForm.css'; 

const AddPetForm = () => {
    const token = "dummy-token"; 
    const [pet, setPet] = useState({
        name: '', breed: '', age: '', description: '', type: 'adoption',
        location: '', imageUrl: '', price: 0, license_id: ''
    });

    const styles = {
        container: { minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px 20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
        card: { maxWidth: '550px', margin: '0 auto', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' },
        header: { background: '#4f46e5', color: '#fff', padding: '40px 30px', textAlign: 'center' },
        form: { padding: '40px' },
        input: { width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '16px', boxSizing: 'border-box' },
        button: { width: '100%', padding: '16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '10px' },
        label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568', fontSize: '14px' },
        row: { display: 'flex', gap: '20px' }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pet.type === 'sale' && !pet.license_id) {
            alert("Security Alert: License ID is required for Commercial Sales.");
            return;
        }
        try {
            await addPet(pet, token);
            alert("Success! Your pet listing is now live. 🐾");
            setPet({ name: '', breed: '', age: '', description: '', type: 'adoption', location: '', imageUrl: '', price: 0, license_id: '' });
        } catch (error) {
            alert(error.response?.data || "Error connecting to server.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={{margin: 0, fontSize: '28px'}}>List a New Pet 🐾</h2>
                    <p style={{opacity: 0.9, marginTop: '10px', fontWeight: '300'}}>Fill in the details to reach potential adopters</p>
                </div>
                
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label style={styles.label}>Pet Name</label>
                    <input style={styles.input} type="text" placeholder="e.g. Buddy" value={pet.name} 
                           onChange={(e) => setPet({...pet, name: e.target.value})} required />
                    
                    <div style={styles.row}>
                        <div style={{flex: 1}}>
                            <label style={styles.label}>Breed</label>
                            <input style={styles.input} type="text" placeholder="Golden Retriever" value={pet.breed}
                                   onChange={(e) => setPet({...pet, breed: e.target.value})} required />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={styles.label}>Age (Years)</label>
                            <input style={styles.input} type="number" placeholder="2" value={pet.age}
                                   onChange={(e) => setPet({...pet, age: e.target.value})} required />
                        </div>
                    </div>

                    <label style={styles.label}>Listing Type</label>
                    <select style={styles.input} value={pet.type} onChange={(e) => setPet({...pet, type: e.target.value})}>
                        <option value="adoption">Free Adoption</option>
                        <option value="sale">Commercial Sale</option>
                    </select>

                    {pet.type === 'sale' && (
                        <div style={styles.row}>
                            <div style={{flex: 1}}>
                                <label style={styles.label}>Price ($)</label>
                                <input style={styles.input} type="number" value={pet.price}
                                       onChange={(e) => setPet({...pet, price: e.target.value})} required />
                            </div>
                            <div style={{flex: 1}}>
                                <label style={{...styles.label, color: '#e53e3e'}}>License ID *</label>
                                <input style={{...styles.input, borderColor: '#feb2b2'}} type="text" placeholder="Required" value={pet.license_id}
                                       onChange={(e) => setPet({...pet, license_id: e.target.value})} required />
                            </div>
                        </div>
                    )}

                    <label style={styles.label}>Location</label>
                    <input style={styles.input} type="text" placeholder="e.g. Chennai, TN" value={pet.location}
                           onChange={(e) => setPet({...pet, location: e.target.value})} required />

                    <label style={styles.label}>Description</label>
                    <textarea style={{...styles.input, height: '100px', resize: 'none'}} placeholder="Describe the pet's personality..." 
                              value={pet.description} onChange={(e) => setPet({...pet, description: e.target.value})} />

                    <button type="submit" style={styles.button}>
                        Confirm and Post Listing
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPetForm;