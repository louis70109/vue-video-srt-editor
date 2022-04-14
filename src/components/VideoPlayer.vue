<template>
  <div class="VideoPlayer">
    <video
      id="player-element"
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-big-play-centered"
      :options="playerOptions"
      controls
      @play="onPlayerPlay()"
      @pause="onPlayerPause()"
    >
      >
      <track
        kind="captions"
        src="https://storage.cloud.google.com/my-nijia-bucket-2/Sequence01.vtt"
        srclang="zh"
        label="Chinese"
        default
      />
    </video>
    <ol v-for="(aud, index) in audios" :key="index">
      <li>
        <button :click="initDataOnStorage(aud.id, aud.name)">
          {{ aud.bucket }}
        </button>
      </li>
      <li>
        <button>{{ aud.name }}</button>
      </li>
    </ol>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { ref, onMounted, onUnmounted } from 'vue';
import { getAudios } from '../utils/audio';
import { getSubtitles } from '../utils/subtitle';
import { getVideoLink, getSubtitleUrl } from '../utils/common';
export default {
  name: 'VideoPlayer',
  setup() {
    let player,
      currentVideoTime = 0,
      subtitleLink = ref(
        localStorage.getItem('lastSubtitle') ||
          'https://dotsub.com/media/5d5f008c-b5d5-466f-bb83-2b3cfa997992/c/chi_hans/vtt'
      ),
      playerOptions = {
        height: '360',
        // autoplay: true,
        muted: true,
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],

        sources: [
          {
            type: 'video/mp4',
            src: localStorage.getItem('lastVideo') || 'http://vjs.zencdn.net/v/oceans.mp4',
          },
        ],
        userActions: {
          hotkeys: function (event) {
            if (!player.paused() && event.which === 27) {
              this.pause();
              currentVideoTime = event.timeStamp;
            } else {
              this.play();
            }
          },
        },
      },
      audios = ref([]);

    onMounted(async () => {
      player = videojs(
        'player-element',
        playerOptions,
        function onPlayerReady() {
          console.log('onPlayerReady');
        }
      );
      audios.value = await getAudios();
    });
    onUnmounted(() => {
      if (player) {
        player.dispose();
      }
    });
    function onPlayerPlay() {
      // console.log('player play!');
    }
    function onPlayerPause() {
      currentVideoTime = currentVideoTime / 1000;
      console.log(player.currentTime());
    }

    async function initDataOnStorage(id, name) {
      subtitleLink.value = await getSubtitleUrl(name);
      let subtitles = JSON.stringify(await getSubtitles(id));
      localStorage.setItem('video', await getVideoLink(name));
      localStorage.setItem('subtitleLink', subtitleLink.value);
      localStorage.setItem('subtitles', subtitles);
      localStorage.setItem('lastSubtitles', subtitleLink.value);
      localStorage.setItem('lastVideo', await getVideoLink(name));
    }
    // function onPlayerEnded(player) {
    //   // console.log('player ended!', player)
    // }
    // function onPlayerLoadeddata(player) {
    //   // console.log('player Loadeddata!', player)
    // }
    // function onPlayerWaiting(player) {
    //   // console.log('player Waiting!', player)
    // }
    // function onPlayerPlaying(player) {
    //   // console.log('player Playing!', player)
    // }
    // function onPlayerTimeupdate(player) {
    //   // console.log('player Timeupdate!', player.currentTime())
    // }
    // function onPlayerCanplay(player) {
    //   // console.log('player Canplay!', player)
    // }
    // function onPlayerCanplaythrough(player) {
    //   // console.log('player Canplaythrough!', player)
    // }
    // // or listen state event
    // function playerStateChanged(playerCurrentState) {
    //   // console.log('player current update state', playerCurrentState)
    // }
    // player is ready
    function playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player);
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    }
    return {
      player,
      audios,
      subtitleLink,
      onPlayerPlay,
      onPlayerPause,
      initDataOnStorage,
      //  onPlayerEnded, onPlayerLoadeddata, onPlayerWaiting,
      // onPlayerPlaying, onPlayerTimeupdate, onPlayerCanplay, onPlayerCanplaythrough, playerStateChanged,
      playerReadied,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
