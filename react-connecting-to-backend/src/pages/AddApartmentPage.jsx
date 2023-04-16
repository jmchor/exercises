import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <== IMPORT

function AddApartmentPage() {
        const [headline, setHeadline] = useState('');
        const [price, setPrice] = useState(1);

        const navigate = useNavigate();

        const handleSubmit = (e) => {
                e.preventDefault();
                const body = { title: headline, pricePerDay: price };

                axios.post('https://ironbnb-m3.herokuapp.com/apartments', body).then((response) => {
                        setHeadline('');
                        setPrice(1);

                        navigate('/');
                });
        };

        return (
                <div className="AddApartmentPage">
                        <h3>Add New Apartment</h3>

                        <form onSubmit={handleSubmit} action="">
                                <label htmlFor="headline">Title</label>
                                <input
                                        type="text"
                                        name="headline"
                                        id="headline"
                                        onChange={(e) => setHeadline(e.target.value)}
                                        value={headline}
                                />

                                <label htmlFor="price">Price per Day</label>
                                <input
                                        type="number"
                                        name="pricePerDay"
                                        id="price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                />

                                <button type="submit">Create Apartment</button>
                        </form>
                </div>
        );
}

export default AddApartmentPage;
