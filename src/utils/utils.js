export const MARGIN = { top: 10, right: 30, bottom: 30, left: 60 }

export const boundsCalculator = (width, height, margin) => {
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;
    return { boundsWidth, boundsHeight };
}