import {createContext, useContext, useEffect, useState} from "react";
import * as d3 from 'd3';

export const DataContext = createContext({});

export const DataProvider = ({children}) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await d3.csv('DETI_Dados_Candidatos-1.csv');
            setData(()=> data);
        }
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{data}}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within a DataProvider");
    return context;
}