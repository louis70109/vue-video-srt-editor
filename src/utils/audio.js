const API = process.env.VUE_APP_API;

async function getAudios() {
  const res = await fetch(`${API}/audios/`);
  return await res.json();
}

async function getAudio(name) {
  const res = await fetch(`${API}/audios/${name}`);
  return await res.json();
}


export {
  getAudios,
  getAudio,
};
