import React from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ContainerS } from 'styles/commonComponents';
import styled from 'styled-components';

const linksAuth = [
  {
    name: 'Posts',
    link: 'post',
  },
  {
    name: 'Categories',
    link: 'category',
  },
];

const SHeader = styled.header`
  padding: 1rem 0;
  background-color: lightblue;
`;

const SList = styled.ul`
  display: flex;
  margin-left: auto;
`;

const SListItem = styled.li`
  padding: 0 0.5rem;
`;

const SNav = styled.nav`
  display: flex;
`;

const SLink = styled(NavLink)`
  font-size: 1.1rem;
  font-weight: bold;
  &.active {
    /*  color: ${(props) => props.theme.danger}; */
    color: #40a9ff;
  }
`;

const Header = (props: any) => {
  return (
    <>
      <SHeader>
        <ContainerS>
          <SNav>
            <SLink to="/">Home</SLink>
            <SList>
              {linksAuth.map((el, index) => {
                return (
                  <SListItem key={index}>
                    <SLink to={el.link}>{el.name}</SLink>
                  </SListItem>
                );
              })}
            </SList>
          </SNav>
        </ContainerS>
      </SHeader>
    </>
  );
};

export default Header;
