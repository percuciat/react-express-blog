import React, { ReactNode, useState, useEffect } from 'react';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { StyledContainer, StyledMain } from 'shared/ui';

export const MainLayout = (props) => {
  const { children } = props;
 // const notification = useAppSelector(selectPostNotification);
  return (
    <>
      <Header />
      <StyledMain>
        <StyledContainer>{children}</StyledContainer>
      </StyledMain>
      <Footer />
    </>
  );
};
