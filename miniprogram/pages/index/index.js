// miniprogram/pages/index/index.js
const db = wx.cloud.database({
  env: 'wx0226-jrufb'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex:0,
     activeId:'page0',
     scrollTop:['社会','娱乐新闻','体育新闻','互联网科技','周围社区','新鲜事','时尚'],
     loginStatus:false,
     typeid:0,
    societyArticleLists:Object,
    rpxHeight: 0,
    goTop:true,
    res:'',
    articleList:Array,
    load:true,
    index:0,
    moreData:Array,
    loadTimes:Number,
    noMore:true,
    pageType:'societyArticle',
    inpVal:''  //获取输入框内容
  },
  /**
   * 搜索文章
   */
  inpVal(e){
    this.setData({
      inpVal:e.detail.value
    })
    console.log(e.detail.value)
  },

  searchArticle(e){
    console.log(e)
    var keyWord = this.data.inpVal;
    db.collection('societyArticle').where({
      content: db.RegExp({
        regexp:keyWord,
        options:'i'
      })
    }).get().then(res =>{
      if(res){
        console.log((JSON.stringify(res.data)))
        wx.navigateTo({
          url: '/pages/searchArticle/searchArticle?articles=' + encodeURIComponent(JSON.stringify(res.data))
        })
      }
    }).catch(error => {
      wx.showModal({
        title: '提示',
        content: '未找到你所查找的信息！',
      })
    })
  },

/**
 * 导航切换
 */
 onTap(e){
  //  console.log(e)
    let index = e.target.dataset.index;
    this.getData(index)
    this.setData({
      curIndex:index,
      activeId:`page${index == 0? 0 : index -1}`
    })
   
   
  },
  /**
   * 获取导航点击对应数据
   */
getData(index){
 let that = this;
//  console.log(index)
  switch(index){
    case 0:
      db.collection('societyArticle').skip(0).limit(10).get().then(res => {
      that.setData({
        articleList:res.data
      })
    })
    console.log(that.data.articleList)
    break;
    case 1:
      db.collection('entertainmentNews').skip(0).limit(10).get().then(res =>{
      console.log(res)
        that.setData({
          articleList: res.data,
          pageType:'entertainmentNews'
        })
    })
    break;
    case 2:
      db.collection('sportsNews').skip(0).limit(10).get().then(res => {
      console.log(res)
      that.setData({
        articleList: res.data,
        pageType:'sportsNews'
      })
    })
    break;
    case 3:
      db.collection('internetTechnology').skip(0).limit(10).get().then(res => {
        console.log(res)
        that.setData({
          articleList: res.data,
          pageType:'internetTechnology'
        })
      })
      break;
    case 4:
      db.collection('community').skip(0).limit(10).get().then(res => {
        console.log(res)
        that.setData({
          articleList: res.data,
          pageType:'community'
        })
      })
      break;
    case 5:
      db.collection('novelty').skip(0).limit(10).get().then(res => {
        console.log(res)
        that.setData({
          articleList: res.data,
          pageType:'novelty'
        })
      })
      break;
    case 6:
      db.collection('fashion').skip(0).limit(10).get().then(res => {
        console.log(res)
        that.setData({
          articleList: res.data,
          pageType:'fashion'
        })
      })
      break;
    
  }
      // db.collection('articleList').get().then(res => console.log(res))
     

  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  
/**
 * 检测页面滑动距离
 */
onPageScroll:function(e){
  if(e.scrollTop > 100){
this.setData({
  goTop:false
})
  }else{
    this.setData({
      goTop:true
    })
  }
},
/**
 * 返回页面顶部
 */
  backTop(){
if(wx.pageScrollTo){
  wx.pageScrollTo({
    scrollTop: 0,
  })
}else{
  wx.showModal({
    title: '提示',
    content: '当前版本过低，暂时无法支持该功能，请升级哦~',
  })
}
  },
/**
 * 页面初始数据加载
 */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    db.collection('societyArticle').skip(0).limit(10).get().then(res => {
      that.setData({
        articleList: res.data
      })
    })
    // this.init();
    console.log(this.data.articleList)
   
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
  },
  setHeight(){
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let height = res.windowHeight;
        let width = res.windowWidth;
        let radio = 750 / width;
        let rpxHeight = height * radio;
        that.setData({
          rpxHeight
        })
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
   * 下拉触底请求数据
   */
 getMoreData(index) {
    let that = this;
    wx.cloud.callFunction({
      name: 'getArticleData',
      data: {
        i: index,
        dataBase:that.data.pageType
      },
      success: function (res) {
        console.log(res.result)
        var moreData = res.result.sum;
        var newArr = that.data.articleList.concat(moreData);
        that.setData({
          articleList:newArr,
          loadTimes:res.result.time
        })
      },
      fail: console.error
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if (this.data.index + 1 > this.data.loadTimes){
      this.setData({
        noMore:false,
        load:true
      })
      return;
    }else{
      this.setData({
        load: false,
        index: this.data.index + 1
      })
      await this.getMoreData(this.data.index)
    }
    
    

  
    // console.log(this.data.articleList)
    
    // console.log(this.data.index)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})