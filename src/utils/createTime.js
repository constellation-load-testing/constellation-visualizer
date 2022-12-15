function createTime(timeToFormat) {
  const hours = timeToFormat.getHours();
  const minutes = timeToFormat.getMinutes();
  const seconds = timeToFormat.getSeconds();
  const rawTimeArray = [hours, minutes, seconds];
  const timeArray = rawTimeArray.map((time) => {
    let timeString = time.toString();
    if (timeString.length === 1) {
      timeString = "0" + timeString;
    }
    return timeString;
  });
  return `${timeArray[0]}:${timeArray[1]}:${timeArray[2]}`;
}

export default createTime;
