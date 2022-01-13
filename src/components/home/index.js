import React from "react"

const HomePage = props => {
    return(
        <div>
            {process.env.REACT_APP_PRIMARY_AC_KEY}
        </div>
    )
}

export default HomePage;