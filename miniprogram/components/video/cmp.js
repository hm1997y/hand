// components/video/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    poster: String,
    duration: String,
    mainText: String,
    videoId: String,
  mainTitle:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPoster: true
  },
  lifetimes:{
    attached(){
      this._getVideoInfo()
    }
  },
 

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this._toggleVideoPoster()
      this.video.play();
    },
    onMaskTap() {
      this._toggleVideoPoster()
      this.video.seek(0);
      this.video.stop();

    },
    _toggleVideoPoster() {
      this.setData({
        showPoster: !this.data.showPoster
      })
    },
    _getVideoInfo(){
      const id = this.properties.videoId;
    this.video = wx.createVideoContext(id, this);
    },
    // _playVideo() {
      
      
      
    // },
    // _stopVideo() {
      
      
    // },
    onVideoEnd(){
      this._toggleVideoPoster();
    }
  }
})
