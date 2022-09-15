import React from 'react';
import { Link, StyledContainer } from 'shared/ui';
import { AuthLogout } from 'features/auth';
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

const StyledHeader = styled('header')((props) => ({
  padding: '1rem 0',
  backgroundColor: 'lightblue',
}));

const StyledHeaderList = styled.ul`
  display: flex;
  margin-left: auto;
`;

const StyledHeaderListItem = styled.li`
  padding: 0 0.5rem;
`;

const StyledHeaderNav = styled.nav`
  display: flex;
`;

const StyledHeaderLink = styled(Link)((props) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: 'black',
}));

export const Header = (props: any) => {
  const isAuth = true;
  return (
    <>
      <StyledHeader>
        <StyledContainer>
          <StyledHeaderNav>
            <StyledHeaderLink to="/">Home</StyledHeaderLink>
            <StyledHeaderList>
              {linksAuth.map((el, index) => {
                return (
                  <StyledHeaderListItem key={index}>
                    <StyledHeaderLink to={el.link}>{el.name}</StyledHeaderLink>
                  </StyledHeaderListItem>
                );
              })}
              {isAuth && <AuthLogout />}
            </StyledHeaderList>
          </StyledHeaderNav>
        </StyledContainer>
      </StyledHeader>
    </>
  );
};
