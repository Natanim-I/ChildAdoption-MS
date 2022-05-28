import React from 'react';

import {StyledTitle, StyledSubtitle, Avatar, StyledButton, ButtonGroup} from "../components/Styles";

import Logo from "./../assets/logo.jpg"

const Home = () => {
    return (
        <div>
            <div style={{
                position: "absolute",
                top: 50,
                left: 0,
                backgroundColor: "transparent",
                width: "100%",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}> <Avatar image={Logo}/></div>
            <StyledTitle size={45}>
                Child Adoption Management System
            </StyledTitle>
            <StyledSubtitle size={20}>
                Feel free to explore our pages
            </StyledSubtitle>
            <ButtonGroup>
                <StyledButton to="/login">Login</StyledButton>
                <StyledButton to="/signup">Signup</StyledButton>
            </ButtonGroup>
        </div>
    );
}
export default Home; 