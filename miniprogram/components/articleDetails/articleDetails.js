// pages/articleDetails/articleDetails.js
var request = require('../../utils/request.js');
var audio = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetails: {},
    danmulist: [{
      text: "112233",
      color: "#f40",
      time: 12
    }],
    videoCover: true,
    playing: false,
    audioCurTime: 0,
    audioWidth: 520,
    processPercent: 0,
    progressCircleLeft: 0,
    audioProgressStart: 0,
    getAudioOriginFlag:false
  },
  onVideo: function() {
    this.setData({
      videoCover: false
    })
    var myVideo = wx.createVideoContext('myVideo');

    myVideo.play();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getData(options.id);
    //   var audio = wx.getBackgroundAudioManager();
    //  audio.title = '此时此刻'
    //   audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
  },
  audiocontrols: function() {
    

    // audio.title = '此时此刻';
    // var src = this.data.articleDetails.audio.src;
    var playing = this.data.playing;

    if (playing) {
      audio.pause()
    } else {
      this.audioPlay();
    }
    this.setData({
      playing: !playing
    })
    // console.log(this.data.articleDetails, src)
    this.listAudioPlay()
    this.upAudioData()
  },
  listAudioPlay: function() {
    var self = this;
    audio.onPause(function() {
      self.setData({
        playing: false
      })
    })
    audio.onStop(function() {
      self.setData({
        playing: false
      })
    })
    audio.onEnded(function() {
      self.setData({
        playing: false
      })
    })
    audio.onPlay(function() {
      self.setData({
        playing: true
      })
    })
  },
  upAudioData: function() {
    var self = this;
    var duration = this.data.articleDetails.audio.duration;
    audio.onTimeUpdate(function() {
      var audioCurTime = audio.currentTime.toFixed();
      var percent = audioCurTime / duration;
      var processPercent = percent * 100;
      self.setData({
        audioCurTime: audioCurTime,
        processPercent: processPercent,
        progressCircleLeft: percent * self.data.audioWidth

      })
    })


  },
  getData: function(id) {
    var self = this;
    request({
      url: 'getArticleDetail/' + id,
      success: function(res) {

        self.setData({
          articleDetails: res
        })
      }
    })
  },
  audioPlay:function(){
    audio.title = '此时此刻';
    var src = this.data.articleDetails.audio.src;
    audio.src = src;
    this.listAudioPlay();
    this.upAudioData();
  },
  audioProgressMove: function(e) {
    
    // console.log(e, e.touches[0].pageX)
    var audioProgressStart = (e.touches[0].pageX) * this.getPhoneRadio();
    // console.log(e.touches[0].pageX,audioProgressStart)
    if (!this.data.getAudioOriginFlag) {
      this.setData({
        audioProgressStart: audioProgressStart,
        getAudioOriginFlag:true
      })
    }
    
  },
  audioCircleMove: function(e) {
    var audioCircleMove = (e.touches[0].pageX) * this.getPhoneRadio();
    var audioProgressStart = this.data.audioProgressStart;
    var progressCircleLeft = audioCircleMove - audioProgressStart;
    console.log(progressCircleLeft, audioProgressStart)
    var processPercent = progressCircleLeft / this.data.audioWidth * 100;
    if (progressCircleLeft <= 0) {
      progressCircleLeft = 0
    } else if (progressCircleLeft >= this.data.audioWidth) {
      progressCircleLeft = this.data.audioWidth;
    }
    var audioCurTime = (progressCircleLeft / this.data.audioWidth * this.data.articleDetails.audio.duration).toFixed();
    this.audioPlay();
    audio.seek(Number(audioCurTime));


    this.setData({
      progressCircleLeft: progressCircleLeft,
      processPercent: processPercent,
      audioCurTime: audioCurTime
    })
  },
  getPhoneRadio: function() {
    var radio = 0;
    wx.getSystemInfo({
      success: function(res) {
        var width = res.screenWidth;
        radio = 750 / width;
      }
    })
    return radio;
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.startPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})