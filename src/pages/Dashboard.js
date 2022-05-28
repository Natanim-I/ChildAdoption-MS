import React from 'react';

import {StyledTitle, StyledSubtitle, Avatar, StyledButton, ButtonGroup, StyledFormArea, colors, ExtraText} from "../components/Styles";

import Logo from "./../assets/logo.jpg"

import { connect } from 'react-redux';
import { logoutuser } from './../auth/actions/userActions';

import { useNavigate } from 'react-router-dom';

const Dashboard = ({logoutuser, user}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "30%",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}> 
                <Avatar image={Logo} 
                style={{
                    position: "absolute",
                    top: 10,
                    left: 20
                }}/>
            </div>
            <StyledFormArea 
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "30%",
                height: "100vh",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}>
                <StyledTitle size={17} 
                style={{
                    position: "absolute",
                    top: 20,
                    left: 105
                }}>
                    Child Adoption Management System
                </StyledTitle>
                <StyledSubtitle size={17}
                style={{
                    position: "absolute",
                    top: 45,
                    left: 105
                }}>
                    {user.firstName} {user.lastName}
                </StyledSubtitle>
                <ExtraText size={15} color={colors.light1}
                style={{
                    position: "absolute",
                    top: 60,
                    left: 109
                }}>
                    {user.email}
                </ExtraText>
                <ButtonGroup 
                style={{
                    position: "absolute",
                    top: 540,
                    left: 100
                }}>
                    <StyledButton to="#" onClick={() => logoutuser(navigate)}>Logout</StyledButton>
                </ButtonGroup>
            </StyledFormArea>
        </div>
    );
}

const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutuser})(Dashboard); 