import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../containers';
import { ContainerS, SectionS } from 'styles/commonComponents';

const MainLayout: any = (props: any) => {
  return (
    <>
      <Header />
      <main className="py-5">
        <SectionS>
          <ContainerS>
            <Outlet />
          </ContainerS>
        </SectionS>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
