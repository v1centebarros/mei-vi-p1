import {useEffect, useRef, useState} from "react";
import {Card} from "../../components/home/card/index.js";
import {Table} from "../../components/plot/table/index.js";
import {useData} from "../../contexts/data.jsx";
import {DeathLinePlot} from "../../components/plot/deathLinePlot/index.js";
import {ResponsiveWrapper} from "../../components/responsiveWrapper/index.js";
import {BAR_PLOT_MARGIN, DEFAULT_MARGIN, NON_LINE_MARGIN} from "../../utils/utils.js";
import {ScatterPlot} from "../../components/plot/scatterPlot/index.js";
import {Histogram} from "../../components/plot/histogram/index.js";
import {SpiderPlot} from "../../components/plot/spiderPlot/index.js";
import {TreePlot} from "../../components/plot/treePlot/index.js";
import {ForcePieChart} from "../../components/plot/forcePieChart/index.js";
import {GunfireBarChart} from "../../components/plot/gunfireBarChart/index.js";
import {Modal} from "../../components/modal/index.js";

export const Home = (props) => {


    const [citizenship, setCitizenship] = useState("all")
    const [gender, setGender] = useState("all")
    const [killedBy, setKilledBy] = useState("all")
    const [injury, setInjury] = useState("all")
    const [region, setRegion] = useState("West Bank")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [modal, setModal] = useState({title: "", content: ""})


    const citizenshipRef = useRef(null);
    const genderRef = useRef(null);
    const killedByRef = useRef(null);
    const injuryRef = useRef(null);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);


    const {data} = useData()
    const [filteredData, setFilteredData] = useState(data)

    const clearFilters = () => {
        setCitizenship("all")
        setGender("all")
        setKilledBy("all")
        setInjury("all")
        setFilteredData(data)
        citizenshipRef.current.value = "all"
        genderRef.current.value = "all"
        killedByRef.current.value = "all"
        injuryRef.current.value = "all"
        startDateRef.current.value = ""
        endDateRef.current.value = ""
    }

    const filterByCitizenship = (row) => citizenship === "all" || row.citizenship === citizenship
    const filterByGender = (row) => gender === "all" || row.gender === gender

    const filterByKilledBy = (row) => killedBy === "all" || row.killed_by === killedBy

    const filterByInjury = (row) => injury === "all" || row.type_of_injury === injury

    const filterByStartDate = (row) => startDate === "" || row.date_of_event >= startDate
    const filterByEndDate = (row) => endDate === "" || row.date_of_event <= endDate

    const filterData = () => data && setFilteredData(() => data.filter((row) => filterByCitizenship(row) && filterByGender(row) && filterByKilledBy(row) && filterByInjury(row) && filterByStartDate(row) && filterByEndDate(row), []))


    useEffect(() => {
        filterData()
    }, [citizenship, gender, killedBy, injury, startDate, endDate])

    useEffect(() => {
        setFilteredData(() => data)
    }, [data])

    return <div className={"grid grid-cols-10 h-full gap-x-4 lg:overflow-y-hidden gap-y-2 lg:gap-y-0 mx-2"} id={"container"}>
        <div className={"col-span-full lg:col-span-2"}>
            <div className={"card bg-base-100"}>
                <div className={"card-body"}>
                    <div className={"card-title mx-auto text-3xl"}>Filters</div>
                    <div className={"flex flex-col gap-2 m-5"}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-xl">Citizenship</span>
                            </label>
                            <select className="select select-bordered"
                                    onChange={(e) => setCitizenship(e.target.value)}
                                    ref={citizenshipRef}>
                                <option value={"all"}>All</option>
                                <option value={"Israeli"}>Israeli</option>
                                <option value={"Palestinian"}>Palestinian</option>
                            </select>

                            <label className="label">
                                <span className="label-text font-bold text-xl">Gender</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setGender(e.target.value)}
                                    ref={genderRef}>
                                <option value={"all"}>All</option>
                                <option value={"M"}>Male</option>
                                <option value={"F"}>Female</option>
                            </select>


                            <label className="label">
                                <span className="label-text font-bold text-xl">Killed By</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setKilledBy(e.target.value)}
                                    ref={killedByRef}>
                                <option value={"all"}>All</option>
                                <option value="Israeli security forces">Israeli security forces</option>
                                <option value="Palestinian civilians">Palestinian civilians</option>
                                <option value="Israeli civilians">Israeli civilians</option>
                            </select>

                            <label className="label">
                                <span className="label-text font-bold text-xl">Type of Injury</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setInjury(e.target.value)}
                                    ref={injuryRef}>
                                <option value="all">All</option>
                                <option value="gunfire">Gunfire</option>
                                <option value="stabbing">Stabbing</option>
                                <option value="hit by a vehicle">Hit by a vehicle</option>
                                <option value="explosion">Explosion</option>
                                <option value="physical assault">Physical assault</option>
                                <option value="shelling">Shelling</option>
                                <option value="being bludgeoned with an axe">Being bludgeoned with an axe</option>
                                <option value="physically assaulted">Physically assaulted</option>
                                <option value="beating">Beating</option>
                                <option value="stones throwing">Stones throwing</option>
                                <option value="Strangulation">Strangulation</option>
                                <option value="fire">Fire</option>
                                <option value="house demolition">House demolition</option>
                            </select>

                            <label className="label">
                                <span className="label-text font-bold text-xl">Start Date</span>
                            </label>
                            <input type="date" className="input input-bordered"
                                   onChange={(e) => setStartDate(e.target.value)} ref={startDateRef}/>

                            <label className="label">
                                <span className="label-text font-bold text-xl">End Date</span>
                            </label>
                            <input type="date" className="input input-bordered"
                                   onChange={(e) => setEndDate(e.target.value)} ref={endDateRef}/>

                        </div>

                        <button className={"btn btn-secondary btn-block"}
                                onClick={clearFilters}
                        >Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className={"col-span-full lg:col-span-8 grid grid-cols-4 lg:overflow-y-auto gap-2 pb-3"}>
            <Card title={"Fatalities over Time"}>
                <ResponsiveWrapper>
                    {({width, height}) => <DeathLinePlot data={filteredData} width={width} height={height}
                                                         margin={DEFAULT_MARGIN}/>}
                </ResponsiveWrapper>
            </Card>
            <Card title={"Age Distribution of Fatalities"}>
                <ResponsiveWrapper>
                    {({width, height}) => <ScatterPlot data={filteredData} width={width} height={height}
                                                       margin={DEFAULT_MARGIN}/>}
                </ResponsiveWrapper>
            </Card>
            <Card title={"Fatalities Record"}>
                <Table data={filteredData}/>
            </Card>
            <Card title={"Age and Gender Distribution of Fatalities"}>
                <ResponsiveWrapper>
                    {({width, height}) => <Histogram data={filteredData} width={width} height={height}
                                                     margin={DEFAULT_MARGIN}/>}
                </ResponsiveWrapper>
            </Card>

            <Card title={"Distribution of Fatalities by City"}>
                <select className="select select-bordered max-w-xs" onChange={(e) => setRegion(e.target.value)}>
                    <option value={"West Bank"}>West Bank</option>
                    <option value={"Gaza Strip"}>Gaza Strip</option>
                    <option value={"Israel"}>Israel</option>
                </select>
                <ResponsiveWrapper>
                    {({width, height}) => <TreePlot data={filteredData} width={width} height={height}
                                                    margin={NON_LINE_MARGIN} regionName={region}/>}
                </ResponsiveWrapper>
            </Card>

            <Card title={"Distribution of Fatalities by Region"}>
                <ResponsiveWrapper>
                    {({width, height}) => <SpiderPlot data={filteredData} width={width} height={height}/>}
                </ResponsiveWrapper>
            </Card>



            <Card title={"Types of Weaponry Used in the Conflict"}>
                <ResponsiveWrapper>
                    {({width, height}) => <GunfireBarChart data={filteredData} width={width} height={height}
                                                           margin={BAR_PLOT_MARGIN}/>}
                </ResponsiveWrapper>
            </Card>

            <Card title={"Fatalities distribution by the Military Forces"}>
                <ResponsiveWrapper>
                    {({width, height}) => <ForcePieChart data={filteredData} width={width} height={height}
                                                         margin={DEFAULT_MARGIN}/>}
                </ResponsiveWrapper>
            </Card>

            {/*<Card title={"Types of Weaponry Used in the Conflict"}>*/}
            {/*    <ResponsiveWrapper>*/}
            {/*        {({ width, height }) => <GunfirePieChart data={filteredData} width={width} height={height} margin={NON_LINE_MARGIN}/>}*/}
            {/*    </ResponsiveWrapper>*/}
            {/*</Card>*/}


            <Modal title={"teste"} content={"teste"}/>
        </div>
    </div>
};