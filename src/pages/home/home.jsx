import {useEffect, useState} from "react";
import {Card} from "../../components/home/card/index.js";
import {Table} from "../../components/plot/table/index.js";
import {useData} from "../../contexts/data.jsx";
import {DeathLinePlot} from "../../components/plot/deathLinePlot/index.js";
import {ResponsiveWrapper} from "../../components/responsiveWrapper/index.js";
import {MARGIN} from "../../utils/utils.js";
import {ScatterPlot} from "../../components/plot/scatterPlot/index.js";
import {Histogram} from "../../components/plot/histogram/index.js";
import {SpiderPlot} from "../../components/plot/spiderPlot/index.js";
import {TreePlot} from "../../components/plot/treePlot/index.js";

export const Home = (props) => {


    const [citizenship, setCitizenship] = useState("all")
    const [gender, setGender] = useState("all")
    const [killedBy, setKilledBy] = useState("all")
    const [injury, setInjury] = useState("all")


    const {data} = useData()
    const [filteredData, setFilteredData] = useState(data)

    const clearFilters = () => {
        setCitizenship("all")
        setGender("all")
        setKilledBy("all")
        setInjury("all")
        setFilteredData(data)
    }

    const filterByCitizenship = (row) => citizenship === "all" || row.citizenship === citizenship
    const filterByGender = (row) => gender === "all" || row.gender === gender

    const filterByKilledBy = (row) => killedBy === "all" || row.killed_by === killedBy

    const filterData = () => data && setFilteredData(() => data.filter((row) => filterByCitizenship(row) && filterByGender(row), []))


    useEffect(() => {
        filterData()
    }, [citizenship, gender])

    useEffect(() => {
        setFilteredData(() => data)
    }, [data])

    return <div className={"grid grid-cols-10 gap-3 p-3"}>
        <div className={"col-span-2 row-span-2 "}>
            <div className={"card bg-base-100 shadow"}>
                <div className={"card-body"}>
                    <div className={"card-title mx-auto text-3xl"}>Filters</div>
                    <div className={"flex flex-col gap-2 m-5"}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-xl">Citizenship</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setCitizenship(e.target.value)}>
                                <option value={"all"}>All</option>
                                <option value={"Israeli"}>Israeli</option>
                                <option value={"Palestinian"}>Palestinian</option>
                            </select>

                            <label className="label">
                                <span className="label-text font-bold text-xl">Gender</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setGender(e.target.value)}>
                                <option value={"all"}>All</option>
                                <option value={"M"}>Male</option>
                                <option value={"F"}>Female</option>
                            </select>


                            <label className="label">
                                <span className="label-text font-bold text-xl">Killed By</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setKilledBy(e.target.value)}>
                                <option value={"all"}>All</option>
                            </select>

                            <label className="label">
                                <span className="label-text font-bold text-xl">Killed By</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setInjury(e.target.value)}>
                                <option value={"all"}>Injury</option>
                            </select>
                        </div>

                        <button className={"btn btn-primary btn-block"}
                                onClick={clearFilters}
                        >Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Card title={"teste1"}>
            <ResponsiveWrapper>
                {({width, height}) => <DeathLinePlot data={filteredData} width={width} height={height} margin={MARGIN}/>}
            </ResponsiveWrapper>
        </Card>
        <Card title={"Scatter Plot"}>
            <ResponsiveWrapper>
                {({ width, height }) => <ScatterPlot data={filteredData} width={width} height={height} margin={MARGIN} />}
            </ResponsiveWrapper>
        </Card>
        <Card title={"Data Table"}>
            <Table data={filteredData}/>
        </Card>
        <Card title={"teste4"}>
            <ResponsiveWrapper>
                {({width, height}) => <Histogram data={filteredData} width={width} height={height} margin={MARGIN}/>}
            </ResponsiveWrapper>
        </Card>


        <Card title={"teste4"}>
            <ResponsiveWrapper>
                {({width, height}) => <SpiderPlot data={filteredData} width={width} height={height}/>}
            </ResponsiveWrapper>
        </Card>

        <Card title={"teste4"}>
            <ResponsiveWrapper>
                {({width, height}) => <TreePlot data={filteredData} width={width} height={height} margin={MARGIN}/>}
            </ResponsiveWrapper>
        </Card>
    </div>
};