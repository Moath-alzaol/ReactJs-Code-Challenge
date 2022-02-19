import { TextField } from "@mui/material";
import React, { Component } from "react";

class TextInput extends Component {
    render() {
        const {
            label,
            placeholder,
            value,
            name,
            disabled = false,
            type = "text",
            error = false,
            validate,
            isTextArea = false,
            className = "",
        } = this.props;
        return (
            <div className="text-input-block">
                <TextField
                    className={className}
                    error={error}
                    id="outlined-error-helper-text"
                    name={name}
                    placeholder={placeholder ?? label}
                    label={label}
                    value={value}
                    helperText={validate}
                    onChange={this.onChange}
                    disabled={disabled}
                    type={type}
                    multiline={isTextArea}
                    minRows={isTextArea ? 4 : 0}
                />
            </div>
        );
    }

    onChange = ({ target: { name, value } }) => {
        const { onFieldChange } = this.props;

        onFieldChange(name, value);
    };
}

export default TextInput;
