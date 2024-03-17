import React from "react";
import "./input.css";
interface InputProps {
    value: string;
    onChange: (value: string) => void;
}
declare const Input: React.FC<InputProps>;
export default Input;
