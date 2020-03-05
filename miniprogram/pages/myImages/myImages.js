// miniprogram/pages/myImages/myImages.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myImages: [''],
    imgSrc: '',
    deleteFlag: true,
    deleteId: null
  },
  /**
   * 从本地相册上传图片保存到我的相册
   * @param {*} options 
   */
  putImg() {
    let timer = null
    console.log('上传')
    let that = this
    wx.chooseImage({
      success: function (res) {
        clearTimeout(timer)
        console.log(res)
        that.setData({
          imgSrc: res.tempFilePaths[0],
          myImages: [res.tempFilePaths[0], ...that.data.myImages]
        })
        setTimeout(() => {
          db.collection('myAlbum').doc('1583390504948_0.1860688340445611_33581362').update({
            data: {
              albumArr: that.data.myImages
            }
          }).then(res => {
            console.log(res)
          })
        }, 0)


      }
    })


  },
  /**
   * 显示删除按钮
   * @param {*} options 
   */
  handleDelete(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      deleteId: id
    })
    console.log(e.currentTarget.dataset)

    console.log(this.data.myImages)
  },
  /**
   * 删除图片
   * @param {*} options 
   */
  deleteImg() {
    console.log('shanchu')
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认要从我的相册移除该图片',
      success(res) {
        if (res.confirm) {
          
          let resList = that.data.myImages.splice(that.data.deleteId, 1)
          db.collection('myAlbum').doc('1583390504948_0.1860688340445611_33581362').update({
            data:{
              albumArr:resList
            }
          }).then(res => {
            db.collection('myAlbum').where({
              _id: '1583390504948_0.1860688340445611_33581362'
            }).get().then(res => {
         
              that.setData({
                myImages: res.data[0].albumArr
              })
            })
          })
        
        }
      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    db.collection('myAlbum').where({
      _id: '1583390504948_0.1860688340445611_33581362'
    }).get().then(res => {
      console.log(res.data[0].albumArr)
      that.setData({
        myImages: res.data[0].albumArr
      })
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