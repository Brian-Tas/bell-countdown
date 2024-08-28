let periodTable;
const toSeconds = time => {
    return((time[0] * 3600) + (time[1] ? time[1] * 60 : 0) + (time[2] ? time[2] : 0) + (time[3] ? time[3]/10 : 0));
}
const getJson = async jsonLink => {
    const raw = await fetch(jsonLink);
    const refined = await raw.json();
    periodTable = refined;
}
const templateToSeconds = data => {
    let dataArr = data.split(':');
    for(let i = 0; i < data.length; i++) {
        dataArr[i] = parseInt(dataArr[i]);
    }
    return toSeconds(dataArr);
}
const getPeriod = inputTime => {
    const currentDate = new Date();
    const dayTable = eval("periodTable." + (currentDate.getDay() === '3' || currentDate.getDay() === '4' ? 'normal' : 'jaguar'))
    const timesTable = Object.values(dayTable); 
    for(let i = 0; i < timesTable.length; i++) {
        if(inputTime < templateToSeconds(timesTable[i])) {
            return templateToSeconds(Object.values(dayTable)[i]);
        }
    } 
    return templateToSeconds(periodTable.normal.hr) + 86400; //hr seconds + seconds in a day
}
(async () => {
    await getJson('./times.json');
    
    setInterval(()=>{
        const currentDate = new Date();
        const currentSeconds = toSeconds([
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds()
        ]);
        let timeDifference = getPeriod(currentSeconds) - currentSeconds;

        document.getElementById("hours").innerHTML = Math.floor(timeDifference / 3600) + ' Hours';
        document.getElementById("minutes").innerHTML = Math.floor((timeDifference % 3600) / 60) + " Minutes"
        document.getElementById("seconds").innerHTML = Math.floor((timeDifference % 3600) % 60) + " Seconds"
    },10)
})();