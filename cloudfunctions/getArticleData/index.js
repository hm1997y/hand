// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const max = 10

// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('societyArticle').count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 10)
 var arr = [];
  await db.collection(event.dataBase).skip( event.i * max).limit(max).get().then(res => {
    console.log(res)
    arr = res.data

  })
  const wxContext = cloud.getWXContext()

  return {
    sum:arr,
    time:batchTimes
  }
}