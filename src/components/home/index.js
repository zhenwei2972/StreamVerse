import React from "react";
import {Link} from 'react-router-dom'

const HomePage = () => {

    return (
        <div>
            <Link to="/auth">
            <button type="button">
                login
            </button>
            </Link>

            <p>Home Page</p>
            <Link to="/call">
            <button type="button">
                call
            </button>
            </Link>

            <Link to="/start">
            <button type="button">
                start
            </button>
            </Link>
           
        </div>
    )
}

export default HomePage;