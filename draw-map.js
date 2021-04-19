async function drawMap() {
    // 1. Access Data
    const censusTracts = await d3.json("https://raw.githubusercontent.com/trevorhein-matc/portfolio/master/milwaukeeCensusTractMap.json")
    const allCensusData = await d3.csv("https://raw.githubusercontent.com/Trehein/datasets/master/v2-ACS-MKE-Census-Data-Master.csv")
    const supervisorDistricts = await d3.json("https://gist.githubusercontent.com/Trehein/1e09ab2019e5a62f190a3dd466106edb/raw/72a967e2e0f245f9cb25149125555b3e491c43f3/mkeSupervisorDistrictGeoJson")
    const extensionSites = await d3.csv("https://raw.githubusercontent.com/Trehein/datasets/master/mkeExtensionSitesFarmersLatLong.csv")
    const data = mapDataBinder(censusTracts, allCensusData)
    // console.log(extensionSites)

    // const tractNameAccessor = d => d.properties["NAME"]
    // const tractIdAccessor = d => d.properties["AFFGEOID"]
    // const metricAccessor = d => d.properties[metric]

    let metric = "aidTotal"

    // 2. Create chart Dimensions
    let dimensions = {
        width: window.innerWidth * 0.65,
        height: window.innerHeight * 0.80,
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        },
    }
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right

    const projection = d3.geoMercator()
        .translate([dimensions.boundedWidth/2, dimensions.boundedWidth/2])
        .scale([95000])
        .center([-87.9065, 42.95009]);
    
    const path = d3.geoPath()
        .projection(projection);

    // 3. Draw canvas
    const wrapper = d3.select("#wrapper")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
    
    const zoomWrapper = wrapper.append("g") // container g to call zoom functions on
        .attr("id", "zoomWrapper")

    const bounds = zoomWrapper.append("g")
        .attr("id", "bounds")
        .style("transform", `translate(${ dimensions.margin.left }px, ${ dimensions.margin.top }px)`)

    const tooltip = d3.select("#wrapper").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // 4. Create scales
    // const metricValueExtent = d3.extent(metricValues)  // Could be used to find min max for each metric

    // 5. Draw Data
    // Tracts
    const tracts = bounds.selectAll('.tract')
        .data(data.features)
        .enter().append('path')
        .transition()
            .attr('class', 'tract')
            .attr('d', path)
            .attr("stroke-width", .075)
            .attr("stroke", "black")
            .attr('fill', d => {
                colorFiller(d, metric)
            })

    // Supervisor Districts
    let supervisorFilter = false;

    bounds.selectAll('.supervisor')
        .data(supervisorDistricts.features)
        .enter()
        .append('path')
        .attr('class', 'supervisor')
        .attr('d', path)
        .attr('stroke-width', .475)
        .attr('stroke', 'blue')
        .attr('fill', 'white')
        .attr('opacity', .55)
        .style('visibility', 'hidden')
        .on('mouseover', handleSupervisorOver)
        .on('mouseout', handleSupervisorOut)

    bounds.selectAll('.supervisorLabel')
        .data(supervisorDistricts.features)
        .enter()
        .append('text')
        .attr('class', 'supervisorLabel')
        .text(d => {
            return d.properties.District_N;
        })
        .attr("x", (d) => {
            if(d.properties.District_N === 1)
                { return path.centroid(d)[0] + 20 }
            else if (d.properties.District_N === 3)
                { return path.centroid(d)[0] + 10 }
            else if (d.properties.District_N === 2)
                { return path.centroid(d)[0] + 8 }
            else if (d.properties.District_N === 7)
                { return path.centroid(d)[0] + 12 }
            else if (d.properties.District_N === 3)
                { return path.centroid(d)[0] + 12 }
            else if (d.properties.District_N === 13)
                { return path.centroid(d)[0] + 10 }
            else if (d.properties.District_N === 5)
                { return path.centroid(d)[0] - 20 }
            else if (d.properties.District_N === 15)
                { return path.centroid(d)[0] + 10 }
            else if (d.properties.District_N === 10)
                { return path.centroid(d)[0] - 8 }
            else if (d.properties.District_N === 12)
                { return path.centroid(d)[0] + 8 }
            else if (d.properties.District_N === 4)
                { return path.centroid(d)[0] + 35 }
            else if (d.properties.District_N === 8)
                { return path.centroid(d)[0] + 5 }
            else if (d.properties.District_N === 17)
                { return path.centroid(d)[0] + 35 }
            else if (d.properties.District_N === 11)
                { return path.centroid(d)[0] + 20 }
            else if (d.properties.District_N === 9)
                { return path.centroid(d)[0] + 55 }
            return path.centroid(d)[0];
        })
        .attr("y", (d) => {
            if (d.properties.District_N === 7)
                { return path.centroid(d)[1] + 41 }
            else if (d.properties.District_N === 13)
                { return path.centroid(d)[1] + 15 }
            else if (d.properties.District_N === 15)
                { return path.centroid(d)[1] - 20 }
            else if (d.properties.District_N === 10)
                { return path.centroid(d)[1] + 20 }
            else if (d.properties.District_N === 12)
                { return path.centroid(d)[1] + 9 }
            else if (d.properties.District_N === 4)
                { return path.centroid(d)[1] + 4 }
            else if (d.properties.District_N === 14)
                { return path.centroid(d)[1] + 12 }
            else if (d.properties.District_N === 17)
                { return path.centroid(d)[1] + 18 }
            else if (d.properties.District_N === 2)
                { return path.centroid(d)[1] + 29 }
            else if (d.properties.District_N === 11)
                { return path.centroid(d)[1] - 25 }
            return  path.centroid(d)[1];
        })
        .attr("text-anchor","middle")
        .style('visibility', 'hidden')

        function handleSupervisorOver(d, i) {
            d3.select(this)
            .transition()
            .duration(550)
            .attr('opacity', 0)
        }

        function handleSupervisorOut(d, i) {
        d3.select(this)
            .transition()
            .duration(550)
            .attr('opacity', 0.55)
        }

        d3.selectAll(".municipalOverlayButton")
        .on("click", () => {                
          console.log("yup")
          if (supervisorFilter)
            {
              bounds.selectAll('.supervisor')
                .style('visibility', 'hidden')
                bounds.selectAll('.supervisorLabel')
                .style('visibility', 'hidden')
              supervisorFilter = false;
            }
          else {
            bounds.selectAll('.supervisor')
              .style('visibility', 'visible')
            bounds.selectAll('.supervisorLabel')
              .style('visibility', 'visible')
            supervisorFilter = true;
          }
        })


    // Site Circles
    let tipMouseover = function(d) {
        // eslint-disable-next-line no-useless-concat
        let html  = "Partner - " + d.partner + "<br />" + 
                "Program - " + d.program + "<br />" + 
                "Participants - " + d.participants;
            tooltip.html(html)
                .style("left", (d3.mouse(this)[0]) + "px")
                .style("top", (d3.event.pageY - 165) + "px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        };
    // tooltip mouseout event handler
    var tipMouseout = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };

    const siteCircles = bounds.selectAll(".circle")
        .data(extensionSites)
        .enter().append('circle')
        .attr('class', d => {
            switch (d.program) {
                case "FoodWIse":
                    return "foodWIse";
                case "Comm Dev":
                    return "commDev";
                case "4-H":
                    return "fourH";
                case "Urban Agriculture":
                    return "urbanAg";
                case "Horticulture":
                    return "hort";
                case "Positive Youth Dev.":
                    return "posYouthDev";
                case "Health & Well Being":
                    return "hwb";
                case "Farmers":
                    return "farmers";
                default:
                    break;
            }
            return d.program
        })
        .attr("cx", d => {
            return projection([d.long, d.lat])[0];
        })
        .attr("cy", d => {
            return projection([d.long, d.lat])[1];
        })
        .attr("r", d => {
            return Math.sqrt(parseInt(d.participants)) * 0.85;
        })
        .style("fill", d => {
            if (d.program === "FoodWIse") {
                return "red"
            } else if (d.program === "Comm Dev") {
                return "orange"
            } else if (d.program === "4-H") {
                return "yellow"
            } else if (d.program === "Urban Agriculture") {
                return "green"
            } else if (d.program === "Horticulture") {
                return "blue"
            } else if (d.program === "Positive Youth Dev.") {
                return "purple"
            } else if (d.program === "Health & Well Being") {
                return "black"
            } else {
                return '#00bcd4'
            }
        })
        .attr("stroke", 'white')
        .attr("stroke-width", 0.25)
        .attr("stroke-opacity", 0.5)
        .style("fill-opacity", 0.5)
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout)

    // 6. Draw peripherals - Legend

    const legendInitColors = d3.scaleQuantize()
        .range(["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"])
        .domain([0, 800])

    const legendBox = document.getElementById("legend-container").getBoundingClientRect();
    const legendW = legendBox.width
    const legendH = legendBox.height
    const barW = legendW / legendInitColors.range().length

    const x = d3.scaleLinear()
        .domain([-10, 124])
        .rangeRound([45,85]);

    // console.log(legendH)

    const colorLegendSVG = d3.select("#legend-container").append('svg')
        .attr('id', 'colorLegendSVG')

    const colorLegendG = colorLegendSVG.append('g')
        .attr('id', 'colorLegendG')
        .attr('width', legendW)

    colorLegendG.selectAll('.legendScaleBox')
        .data(legendInitColors.range().map(d => {
            d = legendInitColors.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .enter().append('rect')
            .attr('height', 12)
            .attr('y', legendH / 2 - 6)
            .attr('x', (d, i) => barW + i * barW)
            .attr("width", barW)
            .attr('fill', d => legendInitColors(d[0]))

    colorLegendG.append('text')
        .attr("class", "legendOverlayLabel")
        .attr("id", "label")
        .attr("x", legendW / 2 + barW)
        .attr("y", legendH / 2 - 12)
        .attr("fill", "#000")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("# Receiving Assistance");

    let legendColorLabel = colorLegendG.append('g')
        .attr('id', 'legendKeyTicks')
        .attr('class', 'key')
        .attr("transform", "translate(" + -barW + "," + 18 + ")")

    legendColorLabel.call(d3.axisBottom(x)
        .tickSize(13)
        .tickValues(legendInitColors.domain()))
        .select(".domain")
        .remove();

    // 7. Set up interactions

    function onMouseLeave() {
        tooltip.style("opacity", 0)
    }

    // Zoom + Pan
    wrapper.call(d3.zoom()
        .on('zoom', () => {
            zoomWrapper.attr('transform', d3.event.transform);
        }))

    // Dropdown selection
    d3.select("select")
    .on("change", d => {
        metric = d3.select("#overlayDrop").node().value
        bounds.selectAll('.tract')
            .attr('fill', d => {
                colorFiller(d, metric)
            })
        updateLegend(metric)
        d3.select('#overlayInfoTitle')
            .text(metric)
    })

    function updateSites() {
        let value = d3.select(this)._groups[0][0].value
        let check = d3.select(this)._groups[0][0].checked
        if (check) {
            d3.selectAll("." + value)
                .transition().duration(750)
                .attr('r', d => {
                    return Math.sqrt(parseInt(d.participants)) * 0.85;
                })
        } else {
            d3.selectAll("." + value)
                .transition().duration(750)
                .attr('r', 0)
        }
    }

    d3.selectAll(".cb").on("change", updateSites);

}

drawMap();


