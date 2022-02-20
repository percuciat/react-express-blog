import React, {useEffect} from 'react';
import {RouteObject} from 'react-router-dom';
import MainLayout from '../layouts';
import {CategoryPage, HomePage, PostPage, Empty404, LoginPage} from '../pages';

const routes: RouteObject[] = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: 'posts',
                element: <PostPage/>,
            },
            {
                path: 'category',
                element: <CategoryPage/>,
            },
            {
                path: 'login',
                element: <LoginPage/>,
            },
            {
                path: '*',
                element: <Empty404/>,
            },
        ],
    },
];

export default routes;