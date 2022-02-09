import React from 'react';
import {useRoutes} from "react-router-dom";
import routes from "./routes";

function App() {
    let components = useRoutes(routes);
    return (
        <div className="wrapperGlobal">
            {components}
        </div>
    );
}

export default App;
