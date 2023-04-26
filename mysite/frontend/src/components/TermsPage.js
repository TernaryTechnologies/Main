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
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Typography component="h1" variant ="h1">
          Terms
          </Typography>
          <Typography component="ol" variant="body1">
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </Typography>
        </div>
      </div>
      <AppFooter />
    </>
  );
}

export default TermsPage;