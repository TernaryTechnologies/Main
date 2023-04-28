import React from "react";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import Typography from '../components/Typography';

const backgroundImage =
    'https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';


function TermsPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat fixed`,
          minHeight: "calc(100vh - 64px - 56px)", // adjust for navbar and footer height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "50px",
            maxWidth: "1000px",
            margin: "0 auto",
            width: "auto",
          }}
        >
          <Typography variant ="h6">
            Terms
          </Typography>
          <Typography component="p" variant ="body1" style={{textAlign: "left"}}>
            Welcome to our pickup sports website! We're thrilled to have you here and hope you have a great time 
            scheduling and joining pickup sports games with other members. However, before you start using our website, 
            we want to make sure you understand our terms of use. By using our website, you agree to abide by these terms:
          </Typography>
          <Typography component="ol" variant="body1">
            <li>
              Treat others with respect: Our website is designed to help you find other members to play pickup sports games with. 
              However, this does not give you the right to treat others disrespectfully or harass them in any way. Be kind, 
              courteous, and respectful to other members, even if you disagree with them.
            </li>
            <li>
              Be responsible for your own safety: When you join pickup sports games with other members, it's important to remember 
              that you are responsible for your own safety. Make sure you understand the risks associated with the sport and the 
              location where the game will be played. Always wear appropriate safety equipment, and do not engage in any activity 
              that could put yourself or others at risk. Our website is simply a platform for members to connect with each other, 
              and we do not assume any liability for injuries or damages that may occur during pickup sports games.
            </li>
            <li>
              Have fun: The whole point of pickup sports games is to have fun! We encourage all members to have a good time and 
              enjoy themselves while playing sports with others.
            </li>
            <li>
              Our website allows users to schedule pickup-sports games with strangers. Please be aware that agreeing to meet 
              strangers has inherent risks. You are responsible for your own safety and should take all necessary precautions to 
              ensure your own well-being. Beware any event postings with a suspicious address or time. For example, it would not
              be wise to go to a Basketball game in the middle of the forrest with no cell reception at midnight. This is an
              extreme case to keep it interesting. Real threats might be more subtle.
            </li>

          </Typography>
        </div>
      </div>
      <AppFooter />
    </>
  );
}

export default TermsPage;