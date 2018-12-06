import React from 'react'

function Landing(props) {
    return <section className="landing-section">
        <h1 className="landing-title">Atlantis Video Room</h1>
        <div className="landing-buttons"><div className="landing-button-wrapper"><button className="landing-button" onClick={props.onRegisterClick}>Register</button></div><div className="landing-button-wrapper"><button className="landing-button" onClick={props.onLoginClick}>Login</button></div></div>
    </section>
}

export default Landing