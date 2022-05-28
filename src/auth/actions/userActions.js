import axios from "axios";

import { sessionService } from "redux-react-session";

export const loginuser = (credentials, navigate, setFieldError, setSubmitting) => {
    return () => {
    
    axios.post("http://ancient-wildwood-09913.herokuapp.com/user/signin",credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        const {data} = response;

        if(data.status === "Failed"){
            const {message} = data;

            if(message.includes("credentials")){
                setFieldError("email", message);
                setFieldError("password", message);
            } else if(message.includes("password")){
                setFieldError("password", message);
            } else if(message.toLowerCase().includes("email")){
                setFieldError("email", message);
            }
        } else if(data.status === "Success"){
            const userData = data.data[0];
            
            const token = userData._id;

            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(userData).then(() => {
                    navigate("/dashboard");
                }).catch(error => console.error(error))
            }).catch(error => console.error(error))
        }
        setSubmitting(false);
    }).catch(error => console.error(error))
}
}
export const signupuser = (credentials, navigate, setFieldError, setSubmitting) => {
    return (dispatch) => {
    axios.post("http://ancient-wildwood-09913.herokuapp.com/user/signup",credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        const {data} = response;

        if(data.status === "Failed"){
            const {message} = data;

            if(message.includes("first name")){
                setFieldError("firtName", message);
            } else if(message.includes("last name")){
                setFieldError("lastName", message);
            } else if(message.includes("email")){
                setFieldError("email", message);
            } else if(message.includes("password")){
                setFieldError("password", message)
            }

        } else if(data.status === "Pending"){
            const {email} = credentials;
            navigate(`/emailsent/${email}`);
        }
        setSubmitting(false);
    }).catch(error => {console.log(error)})
}
}

export const logoutuser = (navigate) => {
    return () => { 
        sessionService.deleteSession().then(() => {
            sessionService.deleteUser().then(() => {
                navigate("/");
            }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
};

export const forgottenPassword = (credentials, navigate, setFieldError, setSubmitting) => {
    return () => {
    
    axios.post("http://ancient-wildwood-09913.herokuapp.com/user/requestPasswordReset",credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        const {data} = response;

        if(data.status === "Failed"){
            const {message} = data;

            if(message.toLowerCase().includes("email") || message.toLowerCase().includes("password") || message.toLowerCase().includes("user")){
                setFieldError("email", message);
            }
        } else if(data.status === "Pending"){
            const {email} = credentials;
            navigate(`/emailsent/${email}/${true}`)
        }
        setSubmitting(false);
    }).catch(error => console.error(error))
}
}

export const resetPassword = (credentials, navigate, setFieldError, setSubmitting) => {
    return () => {
    
    axios.post("http://ancient-wildwood-09913.herokuapp.com/user/resetPassword",credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        const {data} = response;

        if(data.status === "Failed"){
            const {message} = data;

            if(message.toLowerCase().includes("password")){
                setFieldError("newPassword", message);
            }
        } else if(data.status === "Success"){
            navigate("/emailsent")
        }
        setSubmitting(false);
    }).catch(error => console.error(error))
}
}