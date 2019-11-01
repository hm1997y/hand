// miniprogram/pages/login/login.js
let username = '';
let password = '';
let rePassword = '';
let phone = '';
let email = '';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
isLogin:true
  },
  loginCheck(){
    if (username === '') {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none'
      })
      return 0;
    }
    if (password === '' || password.length < 6) {
      wx.showToast({
        title: '密码不能为空或密码长度不小于6',
        icon: 'none'
      })
      return 0;
    }
return 1;
  },
  check(){
    if(username === ''){
      wx.showToast({
        title: '用户名不能为空',
        icon:'none'
      })
      return 0;
    }


    db.collection('login').where({ username }).get().then(res =>{
        if(res.data.length){
          wx.showToast({
            title: '用户名已存在',
            icon:'none'
          })
        }
    })
   
    if(password === '' || password.length < 6){
      wx.showToast({
        title: '密码不能为空或密码长度不小于6',
        icon:'none'
      })
      return 0;
    }
    if(phone === '' || phone.length < 11){
      wx.showToast({
        title: '手机号不为空或不小于11位',
        icon:'none'
      })
      return 0;
    }
    if(email === '' || email.indexOf('@') == -1){
      wx.showToast({
        title: '邮箱填写错误',
        icon:'none'
      })
      return 0;
    }
return 1;
  },
  reg(){
    let that = this;
    this.setData({
      isLogin:!that.data.isLogin
    })
  },
  usernameInp(e){
      username= e.detail.value
  },
  psdInp(e){
      password= e.detail.value
  },
  userLogin(){
    // db.collection('login').get().then(res => {console.log(res)})
    console.log(this.loginCheck() == true)
    if (this.loginCheck()) {
      db.collection('login').where({
        username,
        password
      }).get().then(res => {
          console.log(res)
          if (res.data.length) {
            // 成功=》缓存=》跳转页面
            wx.showToast({
              title: '登录成功',
              icon:'none',
              duration:1000
            })
            let userInfo = {
              username,
              phone:res.data[0].phone,
              email:res.data[0].email,
              id:res.data[0]._id
            }
            wx.setStorage({
              key: 'userInfo',
              data: userInfo,
            })
            // 登录成功跳转
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/userCenter/userCenter',
              })
            }, 1000)
          //wx.redirectTo({
            //   url: '/pages/index/index',
            // })
          }else{
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
          }
        })
    }
  },
  rePws(e){
      rePassword = e.detail.value
  },
  phoneInp(e){
    phone = e.detail.value
 
  },
  emailInp(e){
      email = e.detail.value
  },
  register(){
    // 判断手机号是否存在
    if (this.check()) {
    db.collection('login').where({phone}).get().then(res => {
        if (res.data.length) {
          wx.showToast({
            title: '手机号已存在',
            icon: 'none'
          })
      } else {
          // 继续注册
          this.userReg();
        }
    })
    }
  },
  /**
   * 用户注册函数
   */
  userReg(){
let that = this;
      db.collection('login').add({
        data: {
          username,
          password,
          phone,
          email
        },
        success(res){
              // 提示用户注册成功
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            duration:1000
          })
          // 注册成功跳转登录
          setTimeout(() => {
            that.setData({
              isLogin: !that.data.isLogin
            })
          }, 1000);
        }   
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})