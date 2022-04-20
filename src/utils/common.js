const API = process.env.VUE_APP_API;

async function getBucket() {
  const res = await fetch(`${API}/bucket/`);
  return await res.json();
}

export async function getVideoLink(name) {
  return `https://storage.cloud.google.com/${await getBucket()}/${name}.mp4`;
}

export async function getSubtitleUrl(name) {
  return `https://storage.cloud.google.com/${await getBucket()}/${name}.vtt`;
}

export const getVideoStorage = () => {
  localStorage.getItem('video');
};

// export function uploadSubtitleBucket

function timeStringToTimeObject(timeString) {
  let d = new Date(); // Creates a Date Object using the clients current time

  let [hours, minutes, seconds] = timeString.split(':');

  d.setFullYear(2020, 1, 1);
  d.setHours(+hours); // Set the hours, using implicit type coercion
  d.setMinutes(minutes); // can pass Number or String - doesn't really matter
  d.setSeconds(seconds);
  return d; //time object
}

function secondToHHMMSS(s) {
  // 0:00:01:123
  return new Date(s * 1000).toISOString().substr(11, 12);
}
export function getTime(time) {
  return new Date(
    2020,
    1,
    1,
    time.substring(0, 2),
    time.substring(3, 5),
    time.substring(6, 8),
    time.substring(9, 11)
  );
}

export function compareTimePeriod(now, start, end) {
  // time must be 00:00:00.000 format
  /* 
  now = 12.2222
  start = '0:01:12.345'
  end = same as start
   */
  const nowObj = getTime(secondToHHMMSS(now)),
    startObj = timeStringToTimeObject(start),
    endObj = timeStringToTimeObject(end);

  if (nowObj >= startObj && nowObj <= endObj) return true;
  return false;
}
