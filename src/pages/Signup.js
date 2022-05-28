import React from "react";

import { StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyRight} from "../components/Styles";

import Logo from "../assets/logo.jpg";

import { Formik, Form } from "formik";
import {TextInput} from "./../components/FormLib";

import {FiMail, FiLock, FiUser} from "react-icons/fi";

import * as Yup from "yup";

import {ThreeDots} from "react-loader-spinner";

import { connect } from "react-redux";
import { signupuser } from "./../auth/actions/userActions";
import { useNavigate } from "react-router-dom";


const Signup = ({signupuser}) => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    Signup
                </StyledTitle>
                <Formik 
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    repeatPass: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required("Required"),
                    lastName: Yup.string().required("Required"),
                    email: Yup.string().email("Invalid email address").required("Required"),
                    password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required"),
                    repeatPass: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match"),
                })} 
                onSubmit={(values, {setSubmittng, setFieldError}) => {
                    signupuser(values, navigate, setFieldError, setSubmittng)
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput name="firstName" type="text" label="First Name" placeholder="first name" icon={<FiUser/>}/>
                            <TextInput name="lastName" type="text" label="Last Name" placeholder="last name" icon={<FiUser/>}/>
                            <TextInput name="email" type="text" label="Email address" placeholder="someone@example.com" icon={<FiMail/>}/>
                            <TextInput name="password" type="password" label="Password" placeholder="********" icon={<FiLock/>}/>
                            <TextInput name="repeatPass" type="password" label="Repeat Password" placeholder="********" icon={<FiLock/>}/>
                            <ButtonGroup>
                                {!isSubmitting && <StyledFormButton 
                                type="submit">Signup</StyledFormButton>}
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
                    Already have an account? <TextLink to="/login">Login</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyRight>
                All rights reserved &copy; 2022
            </CopyRight>
        </div>
    );
}

export default connect(null,{signupuser})(Signup);