# 字幕編輯者(WebVTT, SRT)

## Why do it?

上字幕是一件很痛苦的事，但大家都想看(包含我)，理想上可以內嵌進影片，但如果前期資源較少沒辦法請專人上，當然只能自己來，使用專業的軟體可能不是首選，因此會使用各大影音平台都比較會吃的 **SRT**, **WebVTT** 等格式來製作`軟字幕`，因此就誕生了這個小專案啦🎉

## Action Items


- [ ] Enter 後調整時間
- [ ] 紀錄上次的位置
- [ ] 字幕同步
- [ ] 輸出字幕

## Development
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


## References

- [Example](https://github.com/surmon-china/vue-video-player/blob/master/examples/01-video.vue)
- [video pause](https://devsheet.com/code-snippet/videojs-check-if-video-is-playing/)
- [Current time](https://stackoverflow.com/questions/9870552/how-to-get-current-playback-time-in-video-js)
  - [set](https://stackoverflow.com/questions/47774170/how-to-start-video-at-a-given-time)
- Video centered: vjs-big-play-centered
- Video js with WebVTT subtitle
  - https://stackoverflow.com/questions/31284568/how-to-setup-subtitles-in-video-js
- [Blob create URL reference](https://github.com/videojs/video.js/issues/5923)
- [add v-bind value prefix](https://stackoverflow.com/questions/43053061/vue-js-value-bind-with-prefix-and-suffix)
  - `v-bind:value="'rgb(' + themestopnavback + ')'"`
- [Download JS](https://stackoverflow.com/questions/11620698/how-to-trigger-a-file-download-when-clicking-an-html-button-or-javascript)