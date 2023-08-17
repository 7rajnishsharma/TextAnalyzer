import React from 'react'

export default function Navbar(props) {
    return (

        <nav className={`navbar navbar-expand-lg shadow-sm navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <a className="navbar-brand fw-bold " href="/">{props.title}</a>
                
                <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                    <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.mode === 'light' ? "Enable" : "Disable"} Dark Mode</label>
                </div>
            </div>
        </nav>
    )
}
