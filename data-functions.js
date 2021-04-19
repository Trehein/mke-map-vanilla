const mapDataBinder = (mapData, allCensusData) => {
    let boundMapData = mapData;
    // console.log(mapData)
    // console.log(allCensusData)

    for (let i = 0; i < mapData.features.length; i++) { // creates variables containing data for the current object index
        let dataTract = allCensusData[i].geoID
        let ageMedianBoth = parseFloat(allCensusData[i].ageMedianTotal)
        let ageMedianFemale = parseFloat(allCensusData[i].ageMedianFemale)
        let ageMedianMale = parseFloat(allCensusData[i].ageMedianMale)
        let povPercBelow = parseFloat(allCensusData[i].povPercBelow)
        let aidTotal = parseFloat(allCensusData[i].aidTotal)
        let incomeMedian = parseFloat(allCensusData[i].incomeMedian)
        let langEng = parseFloat(allCensusData[i].langEng)
        let langNonEng = parseFloat(allCensusData[i].langNonEng)
        let langSpan = parseFloat(allCensusData[i].langSpan)
        let disTotal = parseFloat(allCensusData[i].disTotal)
        let uninsuredTotal = parseFloat(allCensusData[i].uninsuredTotal)
        for (let j = 0; j < mapData.features.length; j++) { // binds data to the geoJSON dataset
            let jsonTract = mapData.features[j].properties.AFFGEOID;

            if (dataTract === jsonTract) {
                boundMapData.features[j].properties.ageMedianBoth = ageMedianBoth;
                boundMapData.features[j].properties.ageMedianFemale = ageMedianFemale;
                boundMapData.features[j].properties.ageMedianMale = ageMedianMale;
                boundMapData.features[j].properties.povPercBelow = povPercBelow;
                boundMapData.features[j].properties.aidTotal = aidTotal;
                boundMapData.features[j].properties.incomeMedian = incomeMedian;
                boundMapData.features[j].properties.langEng = langEng;
                boundMapData.features[j].properties.langNonEng = langNonEng;
                boundMapData.features[j].properties.langSpan = langSpan;
                boundMapData.features[j].properties.disTotal = disTotal;
                boundMapData.features[j].properties.uninsuredTotal = uninsuredTotal;

                break;
            }
        }
    }
    return boundMapData;
}

