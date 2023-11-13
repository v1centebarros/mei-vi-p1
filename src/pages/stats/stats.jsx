import {useData} from "../../contexts/data.jsx";
import {useEffect} from "react";
import {ScatterPlot} from "../../components/plot/scatterPlot/index.js";
import {Histogram} from "../../components/plot/histogram/index.js";
import {ForcePieChart} from "../../components/plot/forcePieChart/index.js";
import {GunfirePieChart} from "../../components/plot/gunfirePieChart/index.js";

export const Stats = (props) => {
    const {data} = useData();

    return <div className={"grid grid-cols-2 m-2 gap-2"}>
        <div className={"card bg-base-100"}>
            <div className={"card-body"}>
                <div className={"card-title"}>Scatter Plot</div>
                <ScatterPlot data={data} />
            </div>
        </div>

        <div className={"card bg-base-100 gap-4"}>
            <div className={"card-body"}>
                <div className={"card-title"}>Scatter Plot</div>
                <Histogram data={data} />
            </div>
        </div>


        <div className={"card bg-base-100 gap-4"}>
            <div className={"card-body"}>
                <div className={"card-title"}>Scatter Plot</div>
                <ForcePieChart data={data} selectedYear={2013}/>
            </div>
        </div>

        <div className={"card bg-base-100 gap-4"}>
            <div className={"card-body"}>
                <div className={"card-title"}>Scatter Plot</div>
                <GunfirePieChart data={data} selectedYear={2013}/>
            </div>
        </div>


    </div>
};