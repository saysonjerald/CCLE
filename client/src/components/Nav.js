import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <NavStyle>
      <div className="nav__wrapper">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/find-tutors">
          Find Tutor
        </Link>
      </div>
    </NavStyle>
  );
};

const NavStyle = styled.nav`
  width: 100%;
  height: 30px;
  background-color: #111;
  display: flex;
  justify-content: end;
  align-items: center;

  & .nav__wrapper {
    width: 35%;
    display: flex;
    justify-content: space-around;
  }

  & .link {
    font-size: 16px;
  }
`;

export default Nav;
