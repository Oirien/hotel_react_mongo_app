import React from "react";
import styled from "styled-components";

import "./App.css";
import axios from "axios";
import { useQuery } from "react-query";
import BookingForm from "./BookingForm";
import BookingGrid from "./BookingGrid";

const fetchData = async () => {
    const res = await axios.get("http://localhost:9000/api/bookings/");
    return res.data;
};

function App() {
    const { data, error, isLoading } = useQuery("bookings", fetchData);
    const bookings = JSON.stringify(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div> Error: {error.message}</div>;
    }

    return (
        <>
            <Container>
                <BookingForm />
                <BookingGrid bookings={data} />
            </Container>
        </>
    );
}

const Container = styled.div`
    margin: 0 10%;
`;

export default App;
