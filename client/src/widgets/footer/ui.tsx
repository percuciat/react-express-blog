import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 1rem 0;
  background: lightblue;
  text-align: center;
`;

export const Footer = (props: any) => {
  return <StyledFooter>express-react-blog ©2022 Created by Maksim Semenov</StyledFooter>;
};
