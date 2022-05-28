import React from "react";

import { StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyRight} from "../components/Styles";

import Logo from "../assets/logo.jpg";

import { Formik, Form } from "formik";
import {TextInput} from "./../components/FormLib";

import {FiMail, FiLock} from "react-icons/fi";

import * as Yup from "yup";

import {ThreeDots} from "react-loader-spinner";

import { connect } from "react-redux";
import { loginuser } from "./../auth/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const Login = ({loginuser}) => {
    const navigate = useNavigate();
    const {userEmail} = useParams();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    Login
                </StyledTitle>
                <Formik 
                initialValues={{
                    email: userEmail,
                    password: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email("Invalid email address").required("Required"),
                    password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required"),
                })} 
                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    loginuser(values, navigate, setFieldError, setSubmitting);
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput name="email" type="text" label="Email address" placeholder="someone@example.com" icon={<FiMail/>}/>
                            <TextInput name="password" type="password" label="Password" placeholder="********" icon={<FiLock/>}/>
                            <ButtonGroup>
                                {!isSubmitting && <StyledFormButton 
                                type="submit">Login</StyledFormButton>}
                                {isSubmitting && (
                                    <ThreeDots
                                        color={colors.theme}
                                        height={49}
                                        width={100}
                                    />
                                    )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Forgotten password? <TextLink to="/forgottenpassword">Reset it</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyRight>
                All rights reserved &copy; 2022
            </CopyRight>
        </div>
    );
}

export default connect(null, {loginuser})(Login);