let i = 0;

const dropDown = () => {
    if(i%2){
        document.getElementById('time-content').style.animationName = 'from-left'
        document.getElementById('settings-content').style.animationName = 'to-right';
    } else {
        document.getElementById('time-content').style.animationName = 'to-right';
        document.getElementById('settings-content').style.animationName = 'from-left';
    }
    i++;
}