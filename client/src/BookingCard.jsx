import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const BookingCard = ({ booking }) => {
    const queryClient = useQueryClient();

    const updateCheckInStatus = useMutation(
        async () => {
            const { _id, ...update } = booking;
            const updatedBooking = {
                ...update,
                checked_in: !booking.checked_in,
            };
            await axios.put(`http://localhost:9000/api/bookings/${booking._id}`, updatedBooking);

            return updatedBooking;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("bookings");
            },
        }
    );

    const deleteBooking = useMutation(
        async () => {
            await axios.delete(`http://localhost:9000/api/bookings/${booking._id}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("bookings");
            },
        }
    );

    const handleCheckInToggle = () => {
        updateCheckInStatus.mutate();
    };

    const handleDelete = () => {
        deleteBooking.mutate();
    };

    return (
        <>
            <h3>Reservation for: {booking.name}</h3>
            <p>Contact email: {booking.email}</p>
            <label>
                <input type="checkbox" checked={booking.checked_in} onChange={handleCheckInToggle} />
                Checked In
            </label>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

export default BookingCard;
