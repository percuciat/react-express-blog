import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../containers';

const MainLayout: any = (props: any) => {
    return (
        <>
            <Header />
            <main className="py-5">
                <section className="container">
                    <Outlet />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;