<template>
  <div class="VideoPlayer">
    <video
      id="player-element"
      ref="videoPlayer"
      class="video-js"
      :options="playerOptions"
      controls
      @play="onPlayerPlay()"
      @pause="onPlayerPause()"
    >
      >
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { onMounted, onUnmounted } from 'vue';
export default {
  name: 'VideoPlayer',
  setup() {
    let player,
      currentVideoTime = 0,
      playerOptions = {
        height: '360',
        // autoplay: true,
        muted: true,
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],

        sources: [
          {
            type: 'video/mp4',
            // mp4
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
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
      };

    onMounted(() => {
      player = videojs(
        'player-element',
        playerOptions,
        function onPlayerReady() {
          console.log('onPlayerReady', this);
        }
      );
      
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
      console.log('Hi');
      console.log(player.currentTime());
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
      onPlayerPlay,
      onPlayerPause,
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
