import React from 'react'
import { Link } from 'react-router-dom';

export default props => {
    return (
        <li key={props._id} className="pap-explorer-item grow pointer">
            <Link to={`screenshot/${props._id}`} className="pap-explorer-item__link">
                <img className="pap-explorer-item__image" src={`data:image/gif;base64,${props.data}`} alt=''/>
                <h6 className="f4 pap-explorer-item__title">{props.name}</h6>
            </Link>
        </li>
    )
}
