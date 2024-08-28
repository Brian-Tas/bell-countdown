let periodTable;
const toSeconds = time => {
    return((time[0] * 3600) + (time[1] ? time[1] * 60 : 0) + (time[2] ? time[2] : 0) + (time[3] ? time[3]/10 : 0));
}
const toTime = minutes => {
    return([Math.floor(time/60), time % 60]);
}
const getJson = async jsonLink => {
    const raw = await fetch(jsonLink);
    const refined = await raw.json();
    periodTable = refined;
}
const jsonToSeconds = data => {
    let dataArr = data.split(':');

    for(let i = 0; i < dataArr.length; i++) {
        dataArr[i] = parseInt(dataArr[i]);
    }

    return toSeconds(dataArr);
}
const getPeriod = inputTime => {
    const currentDate = new Date();
    const dayTable = eval("periodTable." + (currentDate.getDay() === '3' || currentDate.getDay() === '4' ? 'normal' : 'jaguar'))
    const timesTable = Object.values(dayTable); 
    
    for(let i = 0; i < timesTable.length; i++) {
        if(inputTime < jsonToSeconds(timesTable[i])) {
            return jsonToSeconds(Object.values(dayTable)[i]);
        }
    }
}
(async () => {
    await getJson('./times.json');
    
    setInterval(()=>{
        const currentDate = new Date();
        const currentSeconds = toSeconds([
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds(),
            Math.round(currentDate.getMilliseconds()/100) //deciseconds or tenths of seconds
        ]);
        
        document.getElementById("title-text").innerHTML = (getPeriod(currentSeconds) - currentSeconds).toFixed(1);
    },100)
})();