import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";

function BookingForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        checked_in: false,
    });

    const queryClient = useQueryClient();

    const createBooking = async () => {
        try {
            await axios.post("http://localhost:9000/api/bookings", formData);
            queryClient.invalidateQueries("bookings");
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;
        const checked = e.target.checked;

        const newValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        createBooking();
        setFormData({
            name: "",
            email: "",
            checked_in: false,
        });
    };

    return (
        <div>
            <h2>Create a Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="checked_in" checked={formData.checked_in} onChange={handleInputChange} />
                        Checked In
                    </label>
                </div>
                <div>
                    <button type="submit">Create Booking</button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;
