<template>
  <div class="VideoPlayer">
    <h2>Editor</h2>
    <div>Current Time: {{ playTime }}</div>
    <div>Subtitle start_time: {{ editorObject['start_time'] }}</div>
    <div>Subtitle end_time: {{ editorObject['end_time'] }}</div>

    <br />

    <span v-for="(editor, index) in editorEdit" :key="index">
      <input :id="index" type="text" :value="editor" />
    </span>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';

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
    onMounted(async () => {
      editorEdit.value = editorObject.description.split(', ');
      editorRestore.value = editorEdit.value;
      // schedule sync to backend
      setInterval(() => {
        playTime.value = Number(localStorage.getItem('lastVideoPlayTime'));
      }, 2000);
    });
    onUnmounted(() => {});

    // function compare(currentString){}
    // function syncToAPI(){}
    return {
      editorObject,
      editorEdit,
      editorRestore,
      playTime,
    };
  },
};
</script>
