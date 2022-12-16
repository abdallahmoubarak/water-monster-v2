export const timeChanger = (od: Date): string => {
  let hours: number = od.getHours();
  let minutes: string | number = od.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const dateTimeChanger = (od: Date): string => {
  let day: number = od.getDate();
  let month: number = od.getMonth();
  let year: number = od.getFullYear();
  let hours: number = od.getHours();
  let minutes: string | number = od.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime: string =
    day +
    "/" +
    (typeof month === "string" ? parseInt(month) + 1 : month + 1) +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    " " +
    ampm;
  return strTime;
};

export const dateChanger = (od: Date): string => {
  let day = od.getDate();
  let month: string | number = od.getMonth();

  const strTime =
    day + "/" + (typeof month === "string" ? parseInt(month) + 1 : month + 1);

  return strTime;
};
