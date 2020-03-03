// miniprogram/pages/userCenter/userCenter.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headSrc:'',
    userData:Object,
    loginStatus:false,
    user:Object,
    id:'',
    result: '',
   
  },
  /**
   * 到用户设置界面
   */
  toUserSet(){
    wx.navigateTo({
      url: '/pages/userSet/userSet',
    })
  },
  /**
   * 我的相册
   */
  toMyImages(){
    if (!this.data.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }

    wx.navigateTo({
      url:'/pages/myImages/myImages'
    })
  },
  /**
   * 扫一扫
   */
  getScancode: function () {
    if (!this.data.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }

    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;

        _this.setData({
          result: result,

        })
      }
    })

  },
  /**
   * 图片上传
   */
  chooseImg(){
    if(!this.data.loginStatus){
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      // wx.showToast({
      //   title: '您还未登录，请先登录',
      //   icon:'none'
      // })
      return;
    }
    let that = this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
         headSrc:res.tempFilePaths[0]
        })

        /**
         * 设置图片缓存，登录状态缓存，更新数据库信息
         */
       
  wx.getStorage({
    key: 'userInfo',
    success: function(res) {
      console.log(res)
      var userInfo = {
        ...res.data,
        headSrc:that.data.headSrc
      }
      that.setData({
        userData:userInfo,
        id:res.data.id
      })
      db.collection('login').doc(res.data.id).update({
        data: {
          headSrc: that.data.headSrc
        }
      }).then(res => {
        
      })
    },
  })
  wx.removeStorage({
    key: 'userInfo',
    success: function(res) {
      wx.setStorage({
        key: 'userInfo',
        data: that.data.userData
      })
    },
  })
  console.log(that.data.userData.headSrc)
      },
    })

   
  },
  /**
   * 跳转客服页面
   */

  toService() {
    if (!this.data.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }

    wx.navigateTo({
      url: '/pages/service/service',
    })
  },
  
  /**
   * 跳转文章收藏页面
   */
  myArticle(){
    if (!this.data.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }

    wx.navigateTo({
      url: '/pages/myArticle/myArticle',
    })
  },
 
  /**
   * 发表文章
   */
  publish(){
    if (!this.data.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }

    wx.navigateTo({
      url: '../../editor/editor',
    })
  },
  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res)
        if(res){
          var id = res.data.id
          console.log(id)
          db.collection('login').where({
            _id:id
         }).get().then((res) => {
           console.log(res.data)
           that.setData({
             user:res.data[0],
             loginStatus:true
           })
         })
         
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (!this.data.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }

  }
})