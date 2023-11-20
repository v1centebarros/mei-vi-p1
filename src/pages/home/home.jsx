import {useRef} from "react";
import {Card} from "../../components/home/card/index.js";

export const Home = (props) => {

    const citizenshipRef = useRef()
    const genderRef = useRef()
    const killedByRef = useRef()
    const injuryRef = useRef()

    const clearFilters = () => {
        citizenshipRef.current.value = "all"
        genderRef.current.value = "all"
        killedByRef.current.value = "all"
        injuryRef.current.value = "all"
    }


    return <div className={"grid grid-cols-10 gap-3 p-3"}>
        <div className={"col-span-2 row-span-2 card bg-base-100 shadow"}>
            <div className={"card-body"}>
                <div className={"card-title mx-auto"}>Filters</div>
            </div>
            <div className={"flex flex-col gap-2 m-5"}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-xl">Citizenship</span>
                    </label>
                    <select className="select select-bordered" ref={citizenshipRef}>
                        <option value={"all"}>All</option>
                        <option value={"israeli"}>Israeli</option>
                        <option value={"palestinian"}>Palestinian</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold text-xl">Gender</span>
                    </label>
                    <select className="select select-bordered" ref={genderRef}>
                        <option value={"all"}>All</option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                    </select>


                    <label className="label">
                        <span className="label-text font-bold text-xl">Killed By</span>
                    </label>
                    <select className="select select-bordered" ref={killedByRef}>
                        <option value={"all"}>All</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold text-xl">Killed By</span>
                    </label>
                    <select className="select select-bordered" ref={injuryRef}>
                        <option value={"all"}>Injury</option>
                    </select>
                </div>

                <button className={"btn btn-primary btn-block"}
                    onClick={clearFilters}
                >Clear Filters</button>
            </div>
        </div>
        <Card title={"teste1"}>
            {/*PLOT HERE*/}
        </Card>
        <Card title={"teste2"}>
            {/*PLOT HERE*/}
        </Card>
        <Card title={"teste3"}>
            {/*PLOT HERE*/}
        </Card>
        <Card title={"teste4"}>
            {/*PLOT HERE*/}
        </Card>

    </div>
};