import React, {useEffect} from 'react';
import {RouteObject} from 'react-router-dom';
import MainLayout from '../layouts';
import {HomePage, PostPage, Empty404} from '../pages';

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
                path: '*',
                element: <Empty404/>,
            },
        ],
    },
];

export default routes;