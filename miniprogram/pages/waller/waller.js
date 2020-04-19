// pages/Waller/Waller.js
//获取应用实例
var timer = require('../../utils/timer.js');
// const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		deletaState:true,
		show:true,
		verifyCode: '', //6617
		captchaLabel: '获取验证码',
		seconds: timer.length,
		captchaDisabled: false,
		list:'',
		msgState:true,
		code:'',
		url: '',
		imgCode:'',
		deleteId:''
	},

	//刷新图片验证
	imgAgain(){
		// this.setData({
		// 	url: app.globalData.url +'common/check-img?userId='+wx.getStorageSync('userId')+'&data='+Math.random()
		// })
	},
	//图形验证码
	imgMsg(e){
		this.setData({
			imgCode: e.detail.value
		})
	},
	//输入验证码
	codeMsg(e){
	
		this.setData({
			code:e.detail.value
		})
	},
// 跳转添加钱包
	goAddWaller(){
		wx.navigateTo({
			url: '../AddWaller/AddWaller',
		})
	},
	//点击显示删除模态款
	showDelete(e){
		// 	this.setData({
		// 		deleteId: e.currentTarget.dataset.bean.id,
		// 		deletaState: false,
		// 			url: app.globalData.url + 'common/check-img?userId=' + wx.getStorageSync('userId') + ''
			
		// })
		console.log(this.data.deleteId)
	},
	resive(){
		this.setData({
			deletaState: true
		})
	},
	//获取手机验证码
	captcha: function (e) {
	
		//1、判断图形验证码是否为空
		if (this.data.imgCode == '') {
			wx.showToast({
				title: '图片验证码为空',
				icon: 'none'
			});
		} else {
			//不为空验证图形验证码是否正确
			// app.httpGet(
			// 	'/user/check-img-code',
			// 	{
			// 		userId: wx.getStorageSync('userId'),
			// 		code: this.data.imgCode
			// 	},
			// 	res => {
			// 		console.log(res);
			// 		if (res.code == 200) {
			// 			//图形验证码正确 ，发送短信验证码
			// 			app.httpGet(
			// 				'/common/send-sms',
			// 				{
			// 					userId: wx.getStorageSync('userId')
			// 				},
			// 				res => {
			// 					console.log(res)
			// 					if (res.code == 200) {
			// 						var param = {
			// 							phone: this.data.phone
			// 						};
			// 						// 禁用按钮点击
			// 						this.setData({
			// 							captchaDisabled: true
			// 						});
			// 						// 立刻显示重发提示，不必等待倒计时启动
			// 						this.setData({
			// 							captchaLabel: timer.length + '秒后重新发送'
			// 						});
			// 						// 启动以1s为步长的倒计时
			// 						var interval = setInterval(() => {
			// 							timer.countdown(this);
			// 						}, 1000);
			// 						// 停止倒计时
			// 						setTimeout(function () {
			// 							clearInterval(interval);
			// 						}, timer.length * 1000);

			// 						if (this.data.seconds == timer.length) {
			// 								console.log(1)
			// 						}
			// 					} else {
			// 						wx.showLoading();
			// 						wx.hideLoading();
			// 						setTimeout(() => {
			// 							wx.showToast({
			// 								title: res.msg,
			// 								icon: "none",
			// 							});
			// 							setTimeout(() => {
			// 								wx.hideToast();
			// 							}, 2000)
			// 						}, 0);
			// 					}
			// 				},
			// 				err => { 
			// 					console.log(err)
			// 				}
			// 			)
			// 		} else {
			// 			wx.showLoading();
			// 			wx.hideLoading();
			// 			setTimeout(() => {
			// 				wx.showToast({
			// 					title: res.msg,
			// 					icon: "none",
			// 				});
			// 				setTimeout(() => {
			// 					wx.hideToast();
			// 				}, 2000)
			// 			}, 0);
			// 		}
			// 	},
			// 	err => {
			// 		console.log(err)
			// 	}
			// )
		}

	},
	//点击删除
	sureDelete(){
		if(this.data.code==''||this.data.imgCode==''){
			wx.showToast({
				title: '验证码不能为空',
				icon: 'none'
			});
		}else{
			// app.httpDelete(
			// 	'/wallet?userId='+ wx.getStorageSync('userId')+'&id='+this.data.deleteId+'&code='+this.data.code+'',
			// 	{

			// 	},
			// 	res => {
			// 		console.log(res)
		
			// 		if (res.code == 200) {
			// 			wx.showLoading();
			// 			wx.hideLoading();
			// 			setTimeout(() => {
			// 				wx.showToast({
			// 					title: '删除成功',
			// 					icon: "none",
			// 				});
			// 				setTimeout(() => {
			// 					wx.hideToast();
			// 					this.setData({
			// 						deletaState: true,
			// 						imgCode: '',
			// 						list: '',
			// 						code: ''
			// 					})
			// 					app.httpGet(
			// 						'/wallet',
			// 						{
			// 							superAddress: wx.getStorageSync('superAddress'),
			// 							userId: wx.getStorageSync('userId')
			// 						},
			// 						res => {
			// 							console.log(res)
			// 							this.setData({
			// 								list: res.data.walletsInfo
			// 							})
			// 							if (res.data.walletsInfo == '') {
			// 								this.setData({
			// 									show: false
			// 								})
			// 							}
			// 						},
			// 						err => {
			// 							console.log(err)
			// 						}
			// 					)
			// 				}, 2000)
			// 			}, 0);
					
			// 		}else{
			// 			wx.showLoading();
			// 			wx.hideLoading();
			// 			setTimeout(() => {
			// 				wx.showToast({
			// 					title: res.msg,
			// 					icon: "none",
			// 				});
			// 				setTimeout(() => {
			// 					wx.hideToast();
			// 				}, 2000)
			// 			}, 0);
				
			// 		}
			// 	},
			// 	err => {
			// 		console.log(err)
			// 	}
			// )
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//钱包数据
		// app.httpGet(
		// 	'/wallet',
		// 	{
		// 		superAddress :wx.getStorageSync('superAddress'),
		// 		userId:wx.getStorageSync('userId')
		// 	},
		// 	res=>{
		// 		console.log(res)
		// 		if (res.code == 403) {
		// 			wx.clearStorageSync(),
		// 				wx.reLaunch({
		// 					url: '../index/index'
		// 				})
		// 		}
		// 		if (res.data.walletsInfo==''){
		// 				this.setData({
		// 					show:false
		// 				})
		// 		}else{
		// 			this.setData({
		// 				list: res.data.walletsInfo
		// 			})
		// 		}
		// 	},
		// 	err=>{
		// 		console.log(err)
		// 	}
		// )
		//图形验证

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