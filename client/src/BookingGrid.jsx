import React from "react";
import BookingCard from "./BookingCard";

const BookingGrid = ({ bookings }) => {
    return (
        <div>
            {bookings.map(booking => (
                <BookingCard booking={booking} key={booking._id} />
            ))}
        </div>
    );
};

export default BookingGrid;
