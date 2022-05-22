export function inputHtmlValueToSubtitleText() {
  const editLength = document.querySelectorAll('.editor-list').length;
  let description = '';
  // console.log(editLength);
  for (let idx = 0; idx < editLength; idx++) {
    const q = document.getElementById(`editor-${idx}`);
    if (q !== null) {
      console.log(q);
      if (idx === editLength - 1) description += q.value;
      else description += q.value + ', ';
    }
  }

  console.log(description);
}

export function computeToOriginSubtitleList() {
  // find original all list
  // find previous
  // find next
}
