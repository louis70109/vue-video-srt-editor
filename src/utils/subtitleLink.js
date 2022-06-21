export default function getSubtitleLink() {
  const vttText = eval(localStorage.getItem('subtitles'));

  const vttBlob = new Blob([vttText], { type: 'text/vtt' });
  const blobURL = URL.createObjectURL(vttBlob);
  return blobURL;
}