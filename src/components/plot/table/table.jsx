import {useData} from "../../../contexts/data.jsx";
import {useEffect} from "react";

export const Table = ({data}) => {

    const limit = 15

    const tableHead = [
        {slug: "name", name: "Name"},
        {slug: "date_of_event", name: "Date"},
        {slug: "age", name: "Age"},
        {slug: "gender", name: "Gender"},
        {slug: "citizenship", name: "Citizenship"},
        {slug: "event_location", name: "Location"},
        {slug: "killed_by", name: "Killed By"},
    ]

    return <div className="max-h-80 overflow-auto">
        <table className="table table-md table-pin-rows table-pin-cols">
            <thead>
            <tr>
                {tableHead.map((head, index) => {
                    return <th key={index} className="text-center">{head.name}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {data && data.slice(0, limit).map((row, index) => {
                return <tr key={index}>
                    {tableHead.map((head, index) => {
                        return <td key={index} className="text-center">{row[head.slug]}</td>
                    })}
                </tr>
            })}
            </tbody>

        </table>
    </div>
};