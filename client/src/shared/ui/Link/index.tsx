import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink)<NavLinkProps>((props) => ({
  color: '#118bee',
  '&.active': {
    color: '#40a9ff;',
  },
}));

export const Link = (props: NavLinkProps) => {
  const { children } = props;
  return <StyledLink {...props}>{children}</StyledLink>;
};
