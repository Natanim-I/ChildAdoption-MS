import React from 'react';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from  "./pages/Dashboard";
import EmailSent from "./pages/EmailSent";
import AuthRoute from './components/AuthRoute';
import BasicRoute from './components/BasicRoute';
import ForgottenPassword from './pages/ForgottenPassword';
import PasswordReset from './pages/PasswordReset';

import {StyledContainer} from "./components/Styles";

import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";

import { connect } from "react-redux";

function App(checked) {
  return (
    <Router>

      {checked && (
      <StyledContainer>
        <Routes>
          <Route path="/passwordreset/:userId/:resetString" element={
            <BasicRoute>
              < PasswordReset />
            </BasicRoute>}
          />
          <Route path="/forgottenpassword" element={
            <BasicRoute>
              < ForgottenPassword />
            </BasicRoute>}
          />
          <Route path="/emailsent" element={
            <BasicRoute>
              < EmailSent />
            </BasicRoute>}
          />
          <Route path="/emailsent/:userEmail" element={
            <BasicRoute>
              < EmailSent />
            </BasicRoute>}
          />
          <Route path="/emailsent/:userEmail/:reset" element={
            <BasicRoute>
              < EmailSent />
            </BasicRoute>}
          />
          <Route path="/signup" element={
            <BasicRoute>
              < Signup />
            </BasicRoute>}
          />
          <Route path="/login" element={
            <BasicRoute>
              <Login />
            </BasicRoute>}
          />
          <Route path="/dashboard" element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>}
          />
          <Route path="/" element={
            <Home />}
          /> 
        </Routes>
      </StyledContainer>
      )}
    </Router>
  );
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked
})

export default connect(mapStateToProps)(App);
