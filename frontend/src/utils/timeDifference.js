const timeDifference = (startTime, endTime) => {
  const startHour = Number(startTime[0]) * 10 + Number(startTime[1]);
  const startMinute = Number(startTime[3]) * 10 + Number(startTime[4]);
  const endHour = Number(endTime[0]) * 10 + Number(endTime[1]);
  const endMinute = Number(endTime[3]) * 10 + Number(endTime[4]);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  if (start > end) {
    console.log("Invalid time instances entered.");
    return -1;
  }

  const rentTime = ((end - start) / 60).toFixed(2);

  return rentTime;
};

export { timeDifference };
