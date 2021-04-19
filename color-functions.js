// returns the selected path color
const colorFiller = (d, metric) => {
    let colorScale = colorScaler(metric)
    d3.selectAll('path')
    .style('fill', (d) => {
        if (d.properties[metric]) {
            return colorScale(d.properties[metric]) 
        } else {
            return "#c9ddff";
        }
    })
}

// matches up the selection with the colorScale range and domain
const colorScaler = metric => {
    let scaleValue = d3.scaleQuantize()
        .range(colorScaleData[metric].range)
        .domain(colorScaleData[metric].domain)
    return scaleValue
}

const colorScaleData = {
    povPercBelow: {
        range: ["#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"],
        domain: [0, 75]
    },
    incomeMedian: {
        range: ["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"],
        domain: [8000, 80000]
    },
    aidTotal: {
        range: ["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"],
        domain: [0, 800]
    },
    uninsuredTotal: {
        range: ["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"],
        domain: [0, 750]
    },
    raceBlackPerc: {
        range: ["#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92"],
        domain: [0, 100]
    },
    disTotal: {
        range: ["#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"],
        domain: [0, 1000]
    },
    ageMedianBoth: {
        range: ["#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f"],
        domain: [18, 55]
    },
    langSpan: {
        range: ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"],
        domain: [0, 75]
    }
}
