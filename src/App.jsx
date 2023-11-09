import Router from "./utils/Router.jsx";
import {DataProvider} from "./contexts/data.jsx";

const App = () => {
    return <DataProvider>
        <Router/>
    </DataProvider>
};

export default App
