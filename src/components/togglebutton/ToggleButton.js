import React from "react";
import './togglebutton.css';

export default function ToggleButton(props) {
    const { toggleTheme, theme } = props.data;

    const toggleBtnStyle = {
        marginRight: theme === "dark" ? "auto" : 0,
        marginLeft: theme === "warm" ? "auto" : 0,
        padding: theme === "dark" ? "0 .05em 0 0" : "0 0.05em 0 0",
    };

    return (
        <div
            onClick={toggleTheme}
            className={`toggle-theme--wrapper ${
                theme === "warm" ? "toggle-theme--wrapper__warm" : ""
            }`}
        >
            <div
                style={toggleBtnStyle}
                className={`toggle-theme--btn ${
                    theme === "warm" ? "toggle-theme--btn__warm" : ""
                }`}
            ></div>
        </div>
    );
}
