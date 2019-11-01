// components/icon/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
isLike:Boolean,
isGood:Boolean,
comments:Array,
like:Number,
share:Number,
good:Number,
conmentNum:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    shareStatus:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 分享
     */
    handleShare() {
      let that = this;
     
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res, 'success')
        that.setData({
          shareStatus: 'share',
          status: true
        })
        return {
          title: '分享心情',
          path: '/pages/index/index',
          imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          success(res) {          
          }
        }
      },
      fail:function(error){
         wx.showModal({
    title: '提示',
    content: '您还未登录，请先登录！',
    success(res) {
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }
  })
      }
    })


    
    //  return{
    //    title:'分享心情',
    //    path:'/pages/index/index',
    //    imageUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
    //    success(res) {
    //      console.log(res)
    //    }
    //  }
     
    },
    /**
     * 收藏
     */
    handleLike(){
      let that = this;
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          that.setData({
            isLike: !that.properties.isLike
          })
          that.triggerEvent('onlike', that.properties.isLike);
        },
        fail:function(error){
          wx.showModal({
            title: '提示',
            content: '您还未登录，请先登录！',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        }
      })

 
    },
    /**
     * 点赞
     */
    handleGood(){
      let isGood = !this.properties.isGood;
      let that = this
     wx.getStorage({
       key: 'userInfo',
       success: function(res) {
         that.setData({
           isGood
         })
         that.triggerEvent('ongood', that.properties.isGood);
       },
       fail:function(error){
         wx.showModal({
           title: '提示',
           content: '您还未登录，请先登录！',
           success(res) {
             if (res.confirm) {
               wx.navigateTo({
                 url: '/pages/login/login',
               })
             }
           }
         })
       }
     })
     

    },

    /**
     * 评论
     */
    handleComment(){
      let that = this
      var comments = JSON.stringify(that.properties.comments);
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          wx.navigateTo({
            url: '/pages/comment/comment?comments=' + comments,
            success(res) {
              console.log(res)
            }
          })

          return;
        },
        fail(error){
          wx.showModal({
            title: '提示',
            content: '您还未登录， 请先登录！',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        }
      })
      
     
      // wx.navigateTo({
      //   url: '/pages/comment/comment?comments=' + comments,
      //   success(res){
      //     console.log(res)
      //   }
      // })

    }
  }
})
