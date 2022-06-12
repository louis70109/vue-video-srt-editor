<template>
  <div class="VideoPlayer">
    <button>Dump VTT</button>

    <h2>Editor</h2>
    <div>最後觀看時間: {{ playTime }}</div>
    <div>字幕 start_time: {{ editorObject['start_time'] }}</div>
    <div>字幕 end_time: {{ editorObject['end_time'] }}</div>
    <button @click="inputHtmlValueToSubtitleText">Sync</button>
    <button @click="syncToAPI">sync to API</button>
    <br />
    <div>
      <span
        class="editor-list"
        v-for="(editor, index) in editorEdit"
        :key="index"
        :id="'editor_span-' + index"
      >
        <input :id="'editor-' + index" type="text" :value="editor" />
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { inputHtmlValueToSubtitleText } from '../utils/editor';
export default {
  name: 'Editor',
  setup() {
    let editorObject = JSON.parse(
        localStorage.getItem('currentSubtitleObject')
      ),
      playTime = ref(0),
      editorEdit = ref([]),
      editorRestore = ref([]);

    function tabKeyPressMergeColumn(el, editorIdIndex) {
      let editor = document.getElementById(`editor-${editorIdIndex}`),
        editorNext = null,
        editorNextIndex = 0;
      const editorIdIndexOrigin = editorIdIndex;

      // 找到當前 tab 的下一個 element HTML
      for (let idx = editorIdIndex + 1; idx < editorEdit.value.length; idx++) {
        editorNext = document.getElementById(`editor-${(editorIdIndex += 1)}`);
        editorNextIndex = idx;
        if (editorNext.value !== null) break;
      }
      // 更改 UI 上的數值
      editorNext.value = editor.value + editorNext.value;
      editor.parentNode.remove();

      // 按下 tab 後修改回傳後端需要的對應陣列
      editorRestore.value[editorNextIndex] =
        editorRestore.value[editorIdIndexOrigin] +
        editorRestore.value[editorNextIndex];
      editorRestore.value[editorIdIndexOrigin] = '~~';
    }

    function enterKeyPress(el, editorIdIndex) {
      let editor = document.getElementById(`editor-${editorIdIndex}`);

      // list ->

      let parent = editor.parentNode;
      // maybe add some CSS here
      const wrapper = document.createElement('div');

      // set the wrapper as child (instead of the element)
      parent.replaceChild(wrapper, editor);
      // set element as child of wrapper
      wrapper.appendChild(editor);

      console.log(editor.value);
    }
    onMounted(async () => {
      editorEdit.value = editorObject.description.split(', ');
      editorRestore.value = editorObject.description.split(', ');
      // schedule sync to backend
      setInterval(() => {
        const latVideoTime = Number(localStorage.getItem('lastVideoPlayTime'));
        if (latVideoTime === null) playTime.value = 0;
        else playTime.value = latVideoTime;
      }, 2000);

      // add event listener on editor input column
      let editorCallback = () => {
        const totalEditorTextLength = editorEdit.value.length;
        for (let idx = 0; idx < totalEditorTextLength; idx++) {
          console.log('------------------');
          // Tab click event
          document
            .getElementById(`editor-${idx}`)
            .addEventListener('keydown', (el) => {
              if (el.which == 9) tabKeyPressMergeColumn(el, idx);
            });
          //  Enter click event
          document
            .getElementById(`editor-${idx}`)
            .addEventListener('keydown', (el) => {
              if (el.which == 13) enterKeyPress(el, idx);
            });
          clearInterval(editorEventSetter);
        }
      };
      const editorEventSetter = setInterval(editorCallback, 2000);
    });
    onUnmounted(() => {});

    // function compare(currentString){}

    function makeArraySequence(anyArray) {
      return anyArray.sort((a, b) => {
        return a.id - b.id;
      });
    }
    function syncToAPI() {
      // current -> editorObject
      // original -> subtitle
      let subtitles = JSON.parse(localStorage.getItem('subtitle'));
      // modify object -> editorRestore

      // arrange list to sequence
      let subtitlesArrange = makeArraySequence(subtitles),
        subTitleResultArrange = makeArraySequence(editorRestore.value);
      console.log('原本' + JSON.stringify(subtitlesArrange));
      console.log('改過的' + subTitleResultArrange);
      console.log(typeof subTitleResultArrange);
      console.log('ddd ' + JSON.stringify(editorObject));
      // const current = JSON.parse(localStorage.getItem('currentSubtitlesubTitleResultArrange'));
      // find current in original
      for (let i = 0; i < subtitlesArrange.length; i++) {
        const current = subtitlesArrange[i];
        if (current.id === editorObject.id) {
          // update next to last dict id
          /* eslint-disable */
          let descriptionModifyResultString = '', count = 0;
          for (let j = 0; j < subTitleResultArrange.length; j++) {
            //
            if (
              subTitleResultArrange[j + 1] !== '~' ||
              j < subTitleResultArrange.length
            )
              descriptionModifyResultString = subTitleResultArrange[j] + ',';
            else {
              subtitlesArrange[j].id =
                subtitlesArrange[j].id + count;
                // cut time condition
                // sync to API function
                /*
                {
                  id: subtitlesArrange[j].id
                  description: descriptionModifyResultString
                  start_time: a time
                  end_time: b time
                  vid: original vid
                }
                */
              descriptionModifyResultString = '';
              count += 1
              
            }
            /* start time
            endtime
            description

            */
          }
          // insert
          subtitlesArrange.splice(i, 0, ...subTitleResultArrange);
          makeArraySequence(subtitlesArrange);
          break;
        }
      }

      // input modify to original
      // update current +1 place to modify last DOM +1 place
    }

    // function subtitleModifyResult() {
    //   console.log(editorRestore.value);
    //   const uniqueArray = editorRestore.value.filter(function (item) {
    //     return item !== '~~';
    //   });
    //   const length = uniqueArray.length;
    //   const currentSubtitleObject = JSON.parse(localStorage.getItem('currentSubtitleObject'));
    //   const startTime = currentSubtitleObject.start_time,
    //     endTime = currentSubtitleObject.end_time;

    //   Date.parse()
    //   timeStringToTimeObject()

    // }
    return {
      editorObject,
      editorEdit,
      editorRestore,
      playTime,
      inputHtmlValueToSubtitleText,
      syncToAPI,
    };
  },
};
</script>
