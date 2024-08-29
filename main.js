let periodTable;
const progressBar = document.getElementById('progress-bar');
const toSeconds = time => {
    return((time[0] * 3600) + //hours
           (time[1] ? time[1] * 60 : 0) + //minutes
           (time[2] ? time[2] : 0) + //seconds
           (time[3] ? time[3]/10 : 0) //milliseconds
          );
}
const getJson = async jsonLink => {
    const raw = await fetch(jsonLink);
    const refined = await raw.json();
    periodTable = refined;
}
const toTime = data => {
    return ([Math.floor(data/3600), Math.floor((data%3600)/60), ((data%3600)%60).toFixed(1)]).join(':')
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
            return ({
             time: jsonToSeconds(Object.values(dayTable)[i]),
             key: Object.keys(dayTable)[i].replace('_'," "),
             nextKey: Object.keys(dayTable)[i + 1 ? i + 1 : null].replace('_'," ")
            });
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
        const currentPeriod = getPeriod(currentSeconds);
        
        document.getElementById("time-text").innerHTML = toTime(currentPeriod.time - currentSeconds);
        document.getElementById("period-text").innerHTML = `Until ${currentPeriod.nextKey}`
    },100)
})();
