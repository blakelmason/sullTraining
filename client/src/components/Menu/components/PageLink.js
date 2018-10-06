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
      <Link to={props.to}>
        <button className="btn btn-outline-light my-1 my-0-md">{props.text}</button>
      </Link>
    </StyledNavItem>
  )
}

export default PageLink;