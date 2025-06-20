import React from "react";
import './style.css'
import Button from "../Button/Button";
const Container = ({ text, children }) => {
    return (
        <div className="container-outer">
          <div className="container-tab">{text}</div>
        <div className="container-inner">
          
            {children}
          </div>
        </div>
      );
};

export default Container;
