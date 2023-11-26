export const DEFAULT_MARGIN = { top: 10, right: 30, bottom: 50, left: 60 }
export const NON_LINE_MARGIN = { top: 10, right: 30, bottom: 10, left: 10 }
export const BAR_PLOT_MARGIN = { top: 10, right: 30, bottom: 20, left: 80 }

export const boundsCalculator = (width, height, margin) => {
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;
    return { boundsWidth, boundsHeight };
}