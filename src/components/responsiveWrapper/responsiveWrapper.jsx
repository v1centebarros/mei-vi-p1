import {useDimensions} from "../../hooks/useDimensions.js";
import {useEffect, useRef} from "react";

export const ResponsiveWrapper = ({children}) => {
    const wrapperRef = useRef();
    const {width, height} = useDimensions(wrapperRef);

    return (
        <div ref={wrapperRef}>
            {children({width, height})}
        </div>
    );
};