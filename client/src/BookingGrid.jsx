import React from "react";
import BookingCard from "./BookingCard";
import styled from "styled-components";

const BookingGrid = ({ bookings }) => {
    return (
        <Flex>
            {bookings.map(booking => (
                <BookingCard booking={booking} key={booking._id} />
            ))}
        </Flex>
    );
};

const Flex = styled.div`
    display: flex;
    max-width: 30%;
    width: 100%;
    gap: 1rem;
`;

export default BookingGrid;
