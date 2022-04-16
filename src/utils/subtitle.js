const API = process.env.VUE_APP_API;

async function getSubtitles(vid, vtt='0') {
  // vtt = 0 return JSON, 1 return WEBVTT string
  const res = await fetch(`${API}/subtitles/${vid}?vtt=${vtt}`);
  return await res.json();
}
async function getSubtitle(vid, id) {
  const res = await fetch(`${API}/subtitles/${vid}/${id}`);
  return await res.json();
}
async function postSubtitle(vid, data) {
  const res = await fetch(`${API}/subtitles/${vid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  return await res.json();
}
async function putSubtitle(vid, data) {
  const res = await fetch(`${API}/subtitles/${vid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  return await res.json();
}
async function deleteSubtitle(vid, id) {
  const res = await fetch(`${API}/subtitles/${vid}/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
}

export { getSubtitles, getSubtitle, postSubtitle, putSubtitle, deleteSubtitle };
