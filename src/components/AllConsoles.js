import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchConsoles } from "../store/consolesReducer";

const AllConsoles = () => {
    const dispatch = useDispatch();
    const consoles = useSelector(state => state.consoles);

    React.useEffect(() => {
        dispatch(fetchConsoles());
    },[])

    return( consoles.length ?
        <div id='all-consoles'>
            <h3>All Gaming Platforms</h3>
            <ul>
                {consoles.map((console,idx) => {
                    return( console.games.length ?
                        <Link to={`/consoles/${console.slug}`} key={idx}>
                            <li>{console.name + ` (${console.games.length})`}</li>
                        </Link>
                        : <span key={idx}></span>
                    )
                })}
            </ul>
        </div>
        : <div>Loading...</div>
    )
}

export default AllConsoles;