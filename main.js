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
    let timeArray = [Math.floor(data/3600), Math.floor((data%3600)/60), ((data%3600)%60).toFixed(1)];
    let fixedArray = [];
    for(let i = 0; i < timeArray.length; i++) {
        fixedArray[i] = timeArray[i] < 10 ? '0' + timeArray[i] : timeArray[i];
    }
    return fixedArray.join(':');
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
    const dayTable = eval(("periodTable." + (currentDate.getDay() === 3 || currentDate.getDay() === 4 ? 'jaguar' : 'normal') + ".times"))
    const timesTable = Object.values(dayTable); 
    
    for(let i = 0; i < timesTable.length; i++) {
        if(inputTime < jsonToSeconds(timesTable[i])) {
            return ({
             value: jsonToSeconds(Object.values(dayTable)[i]),
             key: Object.keys(dayTable)[i].replace('_'," "),
             nextKey: (Object.keys(dayTable)[i + 1] ? Object.keys(dayTable)[i + 1] : Object.keys(dayTable)[0]).replace('_'," ")
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
            currentDate.getSeconds() + 0.6,
            Math.round(currentDate.getMilliseconds()/100) //deciseconds or tenths of seconds
        ]);
        const currentPeriod = getPeriod(currentSeconds);
        const timeDifference = toTime(currentPeriod.value - currentSeconds);
        
        document.getElementById("time-text").innerHTML = timeDifference;
        document.getElementById("period-text").innerHTML = `Until ${currentPeriod.nextKey}`;
    },100)
})();