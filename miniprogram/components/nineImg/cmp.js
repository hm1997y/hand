// components/nineImg/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mainText:String,
    imgSrc:Array,
    content:String

  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgSrc:['/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
    // '/images/12.jpg',
  // ]
  imgSrc:[]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      const imgSrc = this.data.imgSrc;
      const index = e.currentTarget.dataset.index;
      console.log(e)
      wx.previewImage({
        urls: imgSrc,
        current:imgSrc[index]
      })
    }

  }
})
