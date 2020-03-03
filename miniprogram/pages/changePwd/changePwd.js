// miniprogram/pages/changePwd/changePwd.js
let username = ''
let newPwd = ''
let phone = ''
let email = ''
const db = wx.cloud.database();
let Mcaptcha = require('../../utils/mcaptcha.js');
let code = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeStatus:true,
    loginStatus:false
  },
  /**
   * 用户名输入
   */
  usernameInp(e){
    console.log(e)
    username = e.detail.value
  },
  /**
   * 新密码输入
   */
  psdInp(e){
    console.log(e)
    if(username == ''){
      wx.showToast({
        title:'请输入用户名',
        icon:'none'
      })
      return;
    }
    newPwd = e.detail.value
  },
  /**
   * 确认新密码输入
   */
  rePws(e){
    if(newPwd == ''){
      wx.showToast({
        title:'请输入密码',
        icon:'none'
      })
      return;
    }
    if(e.detail.value != newPwd){
      wx.showToast({
        title: '两次输入密码不一致',
        icon:'none'
      })
      return
    }
  },
  /**
   * 输入手机号码
   */
  phoneInp(e){
    
    phone = e.detail.value
  },
  /**
   * 输入邮箱
   */
  emailInp(e){
    if(phone == ''){
      wx.showToast({
        title:'请输入手机号',
        icon:'none'
      })
      return
    }
    email = e.detail.value
  },
  /**
   * 提交修改密码
   */
  register(e){
    console.log(e)
    if(username == ''){
      wx.showToast({
        title: '请输入用户名',
        icon:'none'
      })
      return
    }
    if(newPwd == ''){
      wx.showToast({
        title: '请输入新密码',
        icon:'none'
      })
      return 
    }
    if(phone == ''){
      wx.showToast({
        title: '请输入电话号码',
        icon:'none'
      })
      return
    }
    if(email == ''){
      wx.showToast({
        title: '请输入邮箱',
        icon:'none'
      })
      return
    }

    if(!this.data.changeStatus){
      wx.showToast({
        title:'验证码错误',
        icon:'none'
      })
      return
    }else{
      wx.showToast({
        title:'修改成功',
        icon:'none'
      })
    }
    wx.cloud.callFunction({
      name:'changePassword',
      data:{
        name:username,
        phone:phone,
        email:email,
        password:newPwd
      },
      success:function(res){
        console.log(res, 123)
      }
    })
  },
  /**
   * 图片验证码
   * @param {*} options 
   */
  checkCode(e){
    var val = e.detail.value
    let that = this
    if(val == ''){
      wx.showToast({
        title:'请输入验证码！',
        icon:'none'
      })
    }else if(val == code){
      wx.showToast({
        title:'修改成功！'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '验证码错误',
        success(res){
          if(res.confirm){
            that.setData({
              changeStatus:false
            })
          }
        }
      })
      this.onReady()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.draw(show_num)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var num = that.getRanNum();
    that.setData({
      num:num
    })
    console.log(num)
    code = num
    new Mcaptcha({
      el:'canvas',
      width:80,
      height:40,
      code:num
    })
  },
  getRanNum(){
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var pwd = '';
    for(var i = 0; i < 4; i ++){
      if (Math.random() < 48) {
        pwd += chars.charAt(Math.random() * 48 - 1);
      }
    }
    return pwd;
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
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        if(res){
          that.setData({
            loginStatus:true
          })
        }
      },
    })
    if(!this.data.loginStatus){
    wx.showModal({
      title:'提示',
      content:'您还未登录，请先登录',
      success(res){
        if(res.confirm){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
      return
    }
  }
})