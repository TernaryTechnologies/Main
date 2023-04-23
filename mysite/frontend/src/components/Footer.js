import React, {Component} from 'react';

class Footer extends Component {

    render() {
        return (
            <footer>
            <div className="footer-wrapper">
              <div className="footer-section">
                <h3>About Us</h3>
                <p>
                  We are a pickup sports application dedicated to connecting players
                  and creating communities through sports.
                </p>
              </div>
              <div className="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@pickupsportsapp.com</p>
                <p>Phone: 555-555-5555</p>
              </div>
            </div>
          </footer>
        );
    }

}

export default Footer;