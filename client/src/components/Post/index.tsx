import React from 'react';

const Post = (props: any) => {
    const {title, content} = props;
    return (
        <>
            <li>
                <div className="title">
                    {title}
                </div>
                <div className="content">
                    {content}
                </div>
            </li>
        </>
    );
};

export default Post;