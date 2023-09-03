import React from "react";
import BookingCard from "./BookingCard";
import styled from "styled-components";

const BookingGrid = ({ bookings }) => {
    return (
        <>
            <h1>Booking List</h1>
            <Flex>
                {bookings.map(booking => (
                    <BookingCard booking={booking} key={booking._id} />
                ))}
            </Flex>
        </>
    );
};

const Flex = styled.div`
    gap: 2rem;
    display: flex;
    margin-top: 2rem;
`;

export default BookingGrid;
