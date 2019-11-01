// components/articleType/cmp.js
const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   articleItem:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    articleItem:Object,
    like: Number,
    good:Number
  },
  attached(){
    this.setData({
      articleItem:this.properties.articleItem,
      like:this.properties.articleItem.like,
      good:this.properties.articleItem.good
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 收藏按钮点击缓存文章，并更新数据库信息
     */
    async onLike(e){
      const likeArticle = wx.getStorageSync('likeArticle') || [];
      const len = likeArticle.length;
      // this.properties.articleItem.likeStatus = true;
     var id = this.properties.articleItem._id;
    var type = this.properties.articleItem._typeid;
     var like = this.properties.articleItem.like + 1;
     let that = this;
     
      const articleItem = this.properties.articleItem;
        if(e.detail){
        await db.collection(type).doc(id).update({
          data: {
            likeStatus: e.detail,
            like: like,
          }
        }).then(res => {
          console.log(res)
        db.collection(type).where({
            _id: id
          }).get().then(res => {
            //  that.data.like = res.data[0].like
            that.setData({
              like: like
            })
          })
        })

        likeArticle.unshift(articleItem);
        // wx.setStorageSync({
        //   key:'likeArticle',
        //   data: likeArticle
        // })
        wx.setStorageSync('likeArticle', likeArticle)
      }else{
        var id = this.properties.articleItem._id;
        var type = this.properties.articleItem._typeid;
        var like = that.data.like -1;
        var data = wx.getStorageSync('likeArticle');
        var myIndex = 0;
       data.forEach((ele, index) => {
         if(ele._id == id){
           myIndex = index
           return;
         }
       })
       console.log(articleItem)
        // this.properties.articleItem.likeStatus = false; 
        db.collection(type).doc(id).update({
          data:{
            likeStatus: false,
            like:like
          }
        }).then(res => {
          console.log(res)
        })
       data.splice(myIndex, 1);
       wx.removeStorage({
         key: 'likeArticle',
         success: function(res) {
           console.log(res)
           wx.setStorageSync('likeArticle', data);
         },
       })
        // wx.removeStorageSync({
        //   key: 'likeArticle',
        //   success:function(res){
        //     console.log(res)
        //   }
        // })
      }
   
    },

    /**
     * 点赞按钮记录
     */
   async onGood(e) {
      const goodArticle = wx.getStorageSync('goodArticle') || [];
      const len = goodArticle.length;
      var id = this.properties.articleItem._id;
      var type = this.properties.articleItem._typeid;
      var good = this.properties.articleItem.good + 1;
      let that = this;
    
      const articleItem = that.properties.articleItem;
      if (e.detail) {
       await db.collection(type).doc(id).update({
          data: {
            goodStatus: e.detail,
            good: good,
          }
        }).then(res => {
          console.log(res)
          db.collection(type).where({
            _id: id
          }).get().then(res => {
            that.setData({
              good: good
            })
          })
        })

        goodArticle.unshift(articleItem);
        wx.setStorageSync('goodArticle', goodArticle)
      } else {
        var id = this.properties.articleItem._id;
        var type = this.properties.articleItem._typeid;
        var good = that.data.good - 1;
        var data = wx.getStorageSync('goodArticle');
        var myIndex = 0;
        data.forEach((ele, index) => {
          if (ele._id == id) {
            myIndex = index
            return;
          }
        })
        console.log(articleItem)
        db.collection(type).doc(id).update({
          data: {
            goodStatus: false,
            good: good
          }
        }).then(res => {
          console.log(res)
        })
        data.splice(myIndex, 1);
        wx.removeStorage({
          key: 'goodArticle',
          success: function (res) {
            console.log(res)
            wx.setStorageSync('goodArticle', data);
          },
        })
      }

    }
  }
})
