export default (milli) => {
    const totalMinutes = milli / 1000 / 60;
    const totalHours = totalMinutes / 60;
    const minutes = totalMinutes - (Math.floor(totalHours) * 60);

    const displayHours = Math.floor(totalHours);
    const displayMinutes = (minutes >= 10)
        ? Math.floor(minutes)
        : '0' + Math.floor(minutes);

    return `${displayHours}:${displayMinutes}`;
}
