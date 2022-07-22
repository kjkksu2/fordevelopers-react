export const getTotalTimes = (time: Date) => {
  const year = time?.toLocaleString("en-US", { year: "numeric" });
  const month = time
    ?.toLocaleString("en-US", { month: "numeric" })
    .padStart(2, "0");
  const day = time
    ?.toLocaleString("en-US", { day: "numeric" })
    .padStart(2, "0");

  const hour = time
    ?.toLocaleString("en-US", { hour: "numeric", hour12: false })
    .padStart(2, "0");
  const minute = time
    ?.toLocaleString("ko-KR", { minute: "numeric" })
    .padStart(2, "0");
  const second = time
    ?.toLocaleString("ko-KR", { second: "numeric" })
    .padStart(2, "0");

  return { year, month, day, hour, minute, second };
};
