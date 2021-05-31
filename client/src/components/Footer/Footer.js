import React from "react";
import "./footer.css";
import Heart from "./assets/heart.png";

function Footer() {
    return (
        <div id="footer">
            <h4>Made with love <img id="footerHeartIcon" src={Heart} alt="heart" /></h4>
        </div>
    )
}

export default Footer;