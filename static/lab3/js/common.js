const zeroPad = (num, places) => String(num).padStart(places, '0')

export const TimeToHtml = function(id, time) {
    let hours = time.hours;
    let minutes = time.minutes;
    let seconds = time.seconds;
    return `<span id="hours${id}">${zeroPad(hours, 2)}</span> :
    <span id="minutes${id}">${zeroPad(minutes, 2)}</span> :
    <span id="seconds${id}">${zeroPad(seconds, 2)}</span>`;
}

export const TimeToString = function(time) {
    let hours = time.hours;
    let minutes = time.minutes;
    let seconds = time.seconds;
    return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
}

export const RemoveChildren = function(node) {
    for(let i = node.children.length-1; i >= 0; i--) {
        node.removeChild(node.children[i]);
    }
}