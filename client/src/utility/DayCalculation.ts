const getDaysByWeek = (interval: string) => {
  const simple = new Date(
    parseInt(interval.split("-W")[0]),
    0,
    1 + (parseInt(interval.split("-W")[1]) - 1) * 7
  );
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  const temp = {
    d: ISOweekStart.getDate(),
    m: ISOweekStart.getMonth(),
    y: ISOweekStart.getFullYear(),
  };
  //console.log(ISOweekStart)
  const numDaysInMonth = new Date(temp.y, temp.m + 1, 0).getDate();

  return Array.from({ length: 7 }, (_) => {
    if (temp.d > numDaysInMonth) {
      temp.m += 1;
      temp.d = 1;
    }
    return new Date(temp.y, temp.m, temp.d++).toLocaleDateString();
  }).map((e) => e.split("/"));
};

const getDays = { getDaysByWeek };

export default getDays;
