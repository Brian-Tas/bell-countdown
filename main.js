let periodTable;

const toSeconds = time => {
    return((time[0] * 3600) + time[1] * 60 + (time[2] ? time[2] : 0) + (time[3] ? time[3]/10 : 0));
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

(async () => {
    await getJson('./times.json');
    console.log(jsonToSeconds(periodTable.normal.hr));

    setInterval(()=>{
        const currentTime = new Date();
    
        const currentMinutes = toSeconds([
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        Math.round(currentTime.getMilliseconds()/100) //deciseconds or tenths of seconds
        ]);
    
        
        console.log(currentMinutes);
    },100)
})();