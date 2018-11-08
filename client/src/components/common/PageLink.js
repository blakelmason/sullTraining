import React from 'react';
import { Link } from 'react-router-dom';

const PageLink = (props) => {
  return (
    <Link
      className={`nav-link ml-auto ${window.location.pathname === props.to ? 'active' : ''}`}
      to={props.to}
      onClick={props.onClick}
      style={{ maxWidth: 'fit-content' }}
    >
      {props.text}
    </Link>
  )
}

export default PageLink;