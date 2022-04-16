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

export function SecondToTime(timeString) {
  let d = new Date(); // Creates a Date Object using the clients current time

  let [hours, minutes, seconds] = timeString.split(':');

  d.setHours(+hours); // Set the hours, using implicit type coercion
  d.setMinutes(minutes); // can pass Number or String - doesn't really matter
  d.setSeconds(seconds);

  // If needed, you could also adjust date and time zone

  console.log(d.toString());
}
