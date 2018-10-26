import React from 'react';
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavItem = styled(NavItem)`
  text-align: right;
`

const PageLink = (props) => {
  return (
    <StyledNavItem>
      <Link className={`nav-link ${window.location.pathname === props.to ? 'active' : null}`} to={props.to}>
        {props.icon}
      </Link>
    </StyledNavItem>
  )
}

export default PageLink;