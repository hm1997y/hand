// components/audio/cmp.js

var audio = wx.createInnerAudioContext();
var duration;
Component({
  /**
   * 组件的属性列表
   */


  properties: {
    src:String, 
    audioName:String,
    author:String,
    poster:String,
    title:String,
    content:String,
    audioImg:String
  },

  /**
   * 组件的初始数据
   */
  data: {
   isPlay:false,
    processPercent:0,
    audioCurTime:0,
    progressCircleLeft:56,
    audioWidth:420,
    audioProgressStart: 0,
    alltime:'00:00',
    firstTime:'00:00'
  },
  attached(){
    audio.src = this.properties.src;
    console.log(this.properties.src)
      audio.volume = 0;
      audio.play()
      setTimeout(() => {
        // console.log(audio.duration.toFixed(), audio.currentTime)
        duration = audio.duration.toFixed()
        // audio.onTimeUpdate(() => {
          
        // })
        audio.stop();
      }, 5000)

var that = this
      setTimeout(() => {
        var minute = Math.floor(duration / 60);
        var second = ((duration / 60).toFixed(2) - minute).toFixed(2)* 100;
        var alltime = `0${minute}:${second}`;
 
        that.setData({
          alltime: alltime
        })
      }, 6000)


    
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Audioprogress(){
      let that = this;
      audio.onTimeUpdate(() => {
        var radio = audio.currentTime / duration;
        var processPercent = radio * 100;
        var audioCurTime = audio.currentTime.toFixed();
        var progressCircleLeft = (that.data.audioWidth * radio) + 56;
        // console.log(that.data.audioWidth, that.data.progressCircleLeft, progressCircleLeft)
        that.setData({
          processPercent: processPercent,
          audioCurTime: audioCurTime,
          progressCircleLeft:progressCircleLeft
        })
        // console.log(radio, processPercent, audioCurTime)
        var second = audio.currentTime.toFixed();
           if(second <= 60){
             that.setData({
               firstTime:`00:${second}`
             })
           }else{
             var minute = Math.floor(second / 60);
             second = ((second / 60).toFixed(2) - minute).toFixed(2) * 100;
             that.setData({
               firstTime:`0${minute}:${second}`
             })
           }

      })
     
    },
    handlePlay(){
      let that = this;
      // console.log(duration, this.data.alltime)
      this.setData({
        isPlay:!this.data.isPlay
      })
      if (this.data.isPlay) {
        audio.volume = 1;
        audio.play()
        that.Audioprogress();
        console.log(that.data.processPercent)
        //  audio.onTimeUpdate(() => {
        //    var second = audio.currentTime.toFixed();
        //    if(second <= 60){
        //      that.setData({
        //        firstTime:`00:${second}`
        //      })
        //    }else{
        //      var minute = Math.floor(second / 60);
        //      second = ((second / 60).toFixed(2) - minute).toFixed(2) * 100;
        //      that.setData({
        //        firstTime:`0${minute}:${second}`
        //      })
        //    }
        //  })
      }else{
        audio.pause()
      }
    },
    audioCircleMove(e){
 
      var audioCircleMove = (e.touches[0].pageX) * this.getPhoneRadio();
      var audioProgressStart = this.data.audioProgressStart;
      var progressCircleLeft = audioCircleMove - audioProgressStart + 56;
      var processPercent = progressCircleLeft / this.data.audioWidth * 100;
      if (progressCircleLeft <= 56) {
        progressCircleLeft = 56
      } else if (progressCircleLeft >= this.data.audioWidth) {
        progressCircleLeft = this.data.audioWidth;
      }
      var audioCurTime = (progressCircleLeft / this.data.audioWidth * duration).toFixed();
      audio.play();
      audio.seek(Number(audioCurTime));

      this.setData({
        progressCircleLeft: progressCircleLeft,
        processPercent: processPercent,
        audioCurTime: audioCurTime
      })
    },
    getPhoneRadio: function () {
      var radio = 0;
      wx.getSystemInfo({
        success: function (res) {
          var width = res.screenWidth;
          radio = 750 / width;
        }
      })
      return radio;
    }
  }
})
