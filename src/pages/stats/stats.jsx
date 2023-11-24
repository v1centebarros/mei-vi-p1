import {useData} from "../../contexts/data.jsx";
import {ScatterPlot} from "../../components/plot/scatterPlot/index.js";
import {Histogram} from "../../components/plot/histogram/index.js";
import {ForcePieChart} from "../../components/plot/forcePieChart/index.js";
import {GunfirePieChart} from "../../components/plot/gunfirePieChart/index.js";
import {ResponsiveWrapper} from "../../components/responsiveWrapper/index.js";
import { Card } from "../../components/home/card/index.js";

const MARGIN = { top: 10, right: 30, bottom: 30, left: 60 }


export const Stats = (props) => {
    const {data} = useData();

    return <div className={"grid grid-cols-8 m-2 gap-2"}>
        <Card title={"Scatter Plot"}>
            <ResponsiveWrapper>
                {({width, height}) => <ScatterPlot data={data} width={width} height={height} margin={MARGIN}/>}
            </ResponsiveWrapper>
        </Card>

        <Card title={"Histogram"}>
            <ResponsiveWrapper>
                {({width, height}) => <Histogram data={data} width={width} height={height} margin={MARGIN}/>}
            </ResponsiveWrapper>
        </Card>


        <Card title={"Force Pie Chart"}>
            <ResponsiveWrapper>
                {({width, height}) => <ForcePieChart data={data} width={width} height={height} margin={MARGIN}
                                                     selectedYear={2013}/>}
            </ResponsiveWrapper>
        </Card>

        <Card title={"Gunfire Pie Chart"}>
            <ResponsiveWrapper>
                {({ width, height }) => <GunfirePieChart data={data} width={width} height={height}
                margin={MARGIN}
                    selectedYear={2013} />}
            </ResponsiveWrapper>
        </Card>


    </div>
};