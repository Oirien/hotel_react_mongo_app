import React from "react";
import axios from "axios";
import styled from "styled-components";
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
            <FlexVert>
                <div>
                    <h3>Reservation for: </h3>
                    <h3>{booking.name}</h3>
                </div>
                <div>
                    <p>Contact email: </p>
                    <p>{booking.email}</p>
                </div>
                <Interactive>
                    <label>
                        <input type="checkbox" checked={booking.checked_in} onChange={handleCheckInToggle} />
                        Checked In
                    </label>
                    <Delete onClick={handleDelete}>Delete</Delete>
                </Interactive>
            </FlexVert>
        </>
    );
};

const FlexVert = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: lightblue;
    width: 30%;
`;

const Interactive = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

const Delete = styled.button`
    padding: 0.5rem;
    width: 8rem;
`;

export default BookingCard;
