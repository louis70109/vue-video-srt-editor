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

export function lineLogout() {
  localStorage.setItem('user', '{}');
  window.location.reload();
}

// export function uploadSubtitleBucket