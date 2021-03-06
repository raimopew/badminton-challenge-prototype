import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import BadmintonChallengeLogo from "../../logo.svg";
import "./Logo.css";

export const Logo = () => {
  return (
    <div className="header__logo">
      <Link to="/">
        <Tooltip title="Avalehele">
          <img
            className="header__logo--icon"
            src={BadmintonChallengeLogo}
            alt="logo"
          />
        </Tooltip>
      </Link>
    </div>
  );
};