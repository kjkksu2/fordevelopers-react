interface IWrittenTime {
  created_at: string;
}

function WrittenTime({ created_at }: IWrittenTime) {
  function calculateTime(end: number, start: number, convertNumber: 60 | 24) {
    let count = 0;
    let i = start;

    while (true) {
      if (i === end) break;
      if (i === convertNumber) i = 0;

      count++;
      i++;
    }

    return count;
  }

  function showTime() {
    const currentTime = new Date();
    const writtenTime = new Date(created_at);

    // 초
    const S = 60 * 1000;
    if (currentTime.getTime() - writtenTime.getTime() < S) {
      return `${calculateTime(
        currentTime.getSeconds(),
        writtenTime.getSeconds(),
        60
      )}초 전`;
    }

    // 분
    const M = 60 * 60 * 1000;
    if (currentTime.getTime() - writtenTime.getTime() < M) {
      return `${calculateTime(
        currentTime.getMinutes(),
        writtenTime.getMinutes(),
        60
      )}분 전`;
    }

    // 시간
    const H = 23 * 60 * 60 * 1000;
    if (currentTime.getTime() - writtenTime.getTime() < H) {
      return `${calculateTime(
        currentTime.getHours(),
        writtenTime.getHours(),
        24
      )}시간 전`;
    }

    // 년
    const Y = 365 * 24 * 60 * 60 * 1000;
    const year = writtenTime.toLocaleString("en-US", { year: "numeric" });
    const month = writtenTime
      .toLocaleString("en-US", { month: "numeric" })
      .padStart(2, "0");
    const day = writtenTime
      .toLocaleString("en-US", { day: "numeric" })
      .padStart(2, "0");

    const hour = writtenTime
      .toLocaleString("en-US", { hour: "numeric", hour12: false })
      .padStart(2, "0");
    const minute = writtenTime
      .toLocaleString("ko-KR", { minute: "numeric" })
      .padStart(2, "0");
    const second = writtenTime
      .toLocaleString("ko-KR", { second: "numeric" })
      .padStart(2, "0");

    if (currentTime.getTime() - writtenTime.getTime() < Y) {
      return `${month}-${day} ${hour}:${minute}:${second}`;
    } else {
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  }

  return <>{showTime()}</>;
}

export default WrittenTime;
