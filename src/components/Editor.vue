<template>
  <div class="VideoPlayer">
    <button>Dump VTT</button>

    <h2>Editor</h2>
    <div>Current Time: {{ playTime }}</div>
    <div>Subtitle start_time: {{ editorObject['start_time'] }}</div>
    <div>Subtitle end_time: {{ editorObject['end_time'] }}</div>
    <button @click="inputHtmlValueToSubtitleText">Sync</button>
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
    // description = ref(editorObject.value.description);

    function tabKeyPressMergeColumn(el, editorIdIndex) {
      let editor = document.getElementById(`editor-${editorIdIndex}`),
        editorNext = null;

      // Find next element HTML
      for (
        let idx = editorIdIndex + 1;
        idx < editorEdit.value.length;
        idx++
      ) {
        editorNext = document.getElementById(`editor-${(editorIdIndex += 1)}`);
        if (editorNext !== null) break;
      }

      // need to judge last element
      if (el.which == 9) {
        // merge to next editor input column
        editorNext.value = editor.value + editorNext.value;
        console.log(editorNext.value);
        editor.parentNode.remove();
        console.log(`#editor-${editorIdIndex} upup`);
      }
    }
    function enterKeyPress(el, editorIdIndex) {
      let editor = document.getElementById(`editor-${editorIdIndex}`);
      let parent = editor.parentNode;
      const wrapper = document.createElement('div');

      // set the wrapper as child (instead of the element)
      parent.replaceChild(wrapper, editor);
      // set element as child of wrapper
      wrapper.appendChild(editor);

      console.log(editorObject);
    }
    onMounted(async () => {
      editorEdit.value = editorObject.description.split(', ');
      editorRestore.value = editorEdit.value;
      // schedule sync to backend
      setInterval(() => {
        playTime.value = Number(localStorage.getItem('lastVideoPlayTime'));
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
              tabKeyPressMergeColumn(el, idx);
            });
          //  Enter click event
          document
            .getElementById(`editor-${idx}`)
            .addEventListener('keydown', (el) => {
              enterKeyPress(el, idx);
            });
          clearInterval(editorEventSetter);
        }
      };
      const editorEventSetter = setInterval(editorCallback, 2000);
    });
    onUnmounted(() => {});

    // function compare(currentString){}
    // function syncToAPI(){}
    return {
      editorObject,
      editorEdit,
      editorRestore,
      playTime,
      inputHtmlValueToSubtitleText,
    };
  },
};
</script>
