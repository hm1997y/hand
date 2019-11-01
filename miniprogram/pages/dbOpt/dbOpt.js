
const db = wx.cloud.database({
  env: 'wx0226-jrufb'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:'',
    updateVal:'hemin',
    changeValue:'',
    name:''
  },
  formSubmit(e){
    let userInfo = {
      username:e.detail.value.username,
      password:e.detail.value.password
    }
    this.cloudDbadd(userInfo);
  },
  cloudDbadd(userInfo){
    
    db.collection('myMobileCommunity').add({
      data:{
        name: userInfo.username,
        password: userInfo.password,
        createTime: db.serverDate()
      },
      success(res){
        console.log(res)
      }
     
    })
  },
  getUser(){
    // db.collection('myMobileCommunity').get().then(res => {
    //   console.log(res)
    // })
    let that = this
    db.collection('myMobileCommunity').get({
      success(res){
        console.log(res.data)
        that.setData({
          userList:res.data
        })
      }
    })
  },
  getVal(e){
    this.changeValue = e.detail.value
  },
  updateAllData() {
    db.collection('myMobileCommunity').doc('296065c95d9d9fef00d3b5bf10ab6ad6').remove()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  getUpdateVal(e){
    console.log(e.detail.value)
    let that = this
    this.setData({
      updateVal:e.detail.value
    })
    var name = this.data.updateVal
    db.collection('myMobileCommunity').where({
      name: that.data.updateVal
    }).get().then(res => {
      console.log(res)
    })
  },
  updateAllData(){
    var that = this;
    db.collection('myMobileCommunity').where({
      name:'mary'
    }).get().then(res => {
      console.log(res)
      that.setData({
        name: res.data[0].name
      })
    })
  setTimeout(function(){
    console.log(that.data.name)
  }, 1000)
    db.collection('myMobileCommunity').where({
      name:'hei'
    }).update({
      data:{
        name:'jack'
      }
    }).then(res => {
      console.log(res)
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

  }
})