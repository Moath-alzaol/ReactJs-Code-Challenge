import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextInput from "../blocks/TextInput";
import { windowHeight } from "../../utils/misc";

function Login() {
    const [fields, setFields] = useState({ userName: "" });
    const [errors, setErrors] = useState({ userName: "" });
    // handle fields change start
    const onFieldsChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value,
        });
        setErrors({
            ...errors,
            userName: "",
        });
    };
    // handle fields change end

    // login submit start
    const loginSubmit = async () => {
        let users = JSON.parse(localStorage.getItem("users"));
        let isUser = users.findIndex(({ username }) => username.toLowerCase() === fields.userName.toLowerCase()) !== -1 ? true : false;

        if (isUser) {
            let currentUser = users.find(({ username }) => username.toLowerCase() === fields.userName.toLowerCase());
            await localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = "/";
        } else {
            setErrors({
                ...errors,
                userName: "User Not Found",
            });
        }
    };
    // login submit end

    return (
        <div className="login" style={{ height: windowHeight }}>
            <Container>
                <div className="login__form">
                    <h2>Welcome to site, enter your User name to login</h2>
                    <div>
                        {/* user name input start  */}
                        <TextInput
                            name="userName"
                            label="User Name"
                            placeholder="User Name"
                            validate={errors.userName}
                            value={fields.value}
                            onFieldChange={onFieldsChange}
                            error={errors.userName}
                        />
                        {/* user name input end  */}

                        {/* login submit start  */}
                        <button className="submit-button" onClick={loginSubmit}>
                            Login
                        </button>
                        {/* login submit end  */}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Login;
