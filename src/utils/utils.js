export const boundsCalculator = (width, height, margin) => {
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;
    return { boundsWidth, boundsHeight };
}