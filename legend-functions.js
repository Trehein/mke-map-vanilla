const scaleColors = {
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
        range: ["#880e4f", "#ad1457", "#c2185b", "#d81b60", "#e91e63", "#ec407a", "#f06292", "#f48fb1", "#f8bbd0", "#fce4ec"],
        domain: [18, 55]
    },
    langSpan: {
        range: ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"],
        domain: [0, 75]
    }
}

const legendLabelWrite = (metric) => {
    if (metric === 'aidTotal') {
        d3.select('#label')
            .text('# Receiving Assistance')
    } else if (metric === 'ageMedianBoth') {
        d3.select('#label')
            .text('Median Age')
    } else if (metric === 'incomeMedian') {
        d3.select('#label')
            .text('Household Median $')
    } else if (metric === 'langSpan') {
        d3.select('#label')
            .text('% Spanish Speaking')
    } else if (metric === 'povPercBelow') {
        d3.select('#label')
            .text('% Below Poverty')
    } else if (metric === 'uninsuredTotal') {
        d3.select('#label')
            .text('# Uninsured')
    } else if (metric === 'disTotal') {
        d3.select('#label')
            .text('# Reporting a Disability')
    } 
}

const legendAxisScaler = (metric) => {
    if (metric === 'aidTotal') {
        let x = d3.scaleLinear()
            .domain([0, 800])
            .rangeRound([48, 287]);
        return x;
    } else if (metric === 'ageMedianBoth') {
        let x = d3.scaleLinear()
            .domain([18, 55])
            .rangeRound([48, 287]);
        return x;
    } else if (metric === 'incomeMedian') {
        let x = d3.scaleLinear()
            .domain([8000, 80000])
            .rangeRound([48, 287]);
        return x;
    } else if (metric === 'langSpan') {
        let x = d3.scaleLinear()
            .domain([0, 75])
            .rangeRound([48, 287]);
        return x;
    } else if (metric === 'povPercBelow') {
        let x = d3.scaleLinear()
            .domain([0, 75])
            .rangeRound([48, 287]);
        return x;
    } else if (metric === 'uninsuredTotal') {
        let x = d3.scaleLinear()
            .domain([0, 750])
            .rangeRound([48, 287]);
        return x;
    } else if (metric === 'disTotal') {
        let x = d3.scaleLinear()
            .domain([0, 1000])
            .rangeRound([48, 287]);
        return x;
    } 
}

const legendColorSwitch = (metric) => {
    if (metric === 'aidTotal') {
        let colors = d3.scaleQuantize()
            .range(["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"])
            .domain([0, 800])
        return colors
    } else if (metric === 'ageMedianBoth') {
        let colors = d3.scaleQuantize()
            .range([ "#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f"])
            .domain([0, 800])
        return colors
    } else if (metric === 'incomeMedian') {
        let colors = d3.scaleQuantize()
            .range(["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"])
            .domain([8000, 80000])
        return colors
    } else if (metric === 'langSpan') {
        let colors = d3.scaleQuantize()
            .range(["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"])
            .domain([0, 75])
        return colors
    } else if (metric === 'povPercBelow') {
        let colors = d3.scaleQuantize()
            .range(["#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"])
            .domain([0, 75])
        return colors
    } else if (metric === 'uninsuredTotal') {
        let colors = d3.scaleQuantize()
            .range(["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"])
            .domain([0, 750])
        return colors
    } else if (metric === 'disTotal') {
        let colors = d3.scaleQuantize()
            .range(["#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"])
            .domain([0, 1000])
        return colors
    } 
}

const legendInitColors = d3.scaleQuantize()
    .range(["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"])
    .domain([0, 800])

const legendBox = document.getElementById("legend-container").getBoundingClientRect();
const legendW = legendBox.width
const legendH = legendBox.height
const barW = legendW / 10;

const legendScaleUpdate = (metric) => {
    d3.selectAll('.key')
        .remove()

    legendColorLabel = d3.select("#colorLegendG").append('g')
        .attr("id", "legendKeyTicks")
        .attr("class", "key")
        .attr("transform", "translate(" + -barW + "," + 18 + ")")

    let x = legendAxisScaler(metric);
    legendColorLabel.call(d3.axisBottom(x)
        .tickSize(13)
        .tickValues(scaleColors[metric].domain))
        .select(".domain")
        .remove();

    let colors = legendColorSwitch(metric)

    d3.selectAll('rect')
        .data(colors.range().map(d => {
            d = colors.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .attr('fill', d => colors(d[0]))
}

const updateLegend = (metric) => {
    // console.log(metric)
    legendLabelWrite(metric)
    legendScaleUpdate(metric)
}









