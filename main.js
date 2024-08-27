let periodTable;

const toMinutes = time => {
    return((time[0] * 60) + time[1]);
}

const toTime = minutes => {
    return([Math.floor(time/60), time % 60]);
}

const getJson = async jsonLink => {
    const raw = await fetch(jsonLink);
    const refined = await raw.json();
    periodTable = refined;
}

const unpackageJson = json => {
    
}

(async () => {
    await getJson('./times.json');
    console.log(periodTable);
})();