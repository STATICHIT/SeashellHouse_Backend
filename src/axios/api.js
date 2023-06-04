import http from './http.js'
// import qs from 'qs';
let apiFun = {
};

//登录
apiFun.login = params => {
  return http.post('/users/login',params)
}

//注册
apiFun.enroll = params => {
  return http.post('/users/resetPsw',params)
}

//上传图片
apiFun.addImg = (params) => {
  return http.post('/article-version',params);
}

// 获取所有楼盘信息
apiFun.getAllHouses = params => {
  return http.get('/houses/'+params.a1+'/'+params.a2)
}

// 获取所有二手房信息
apiFun.getAllSeconds = params => {
  return http.get('/seconds/'+params.a1+'/'+params.a2+'?'+params.other)
}

// 获取所有租房信息
apiFun.getAllRents = params => {
  return http.get('/rents/'+params.a1+'/'+params.a2+'?'+params.other)
}

//根据id获取指定楼盘
apiFun.getHouseById = params =>{
  return http.get('/houses/'+params.id)
} 
//根据id获取指定二手房
apiFun.getSecondById = params =>{
  return http.get('/seconds/'+params.id)
} 
//根据id获取指定租房
apiFun.getRentById = params =>{
  return http.get('/rents/'+params.id)
} 

//根据way的值执行与fond相关的操作
//way=1:查询当前用户是否关注了某房源
//way=2:增加新的关注数据
//way=3:删除关注数据
apiFun.fond = params =>{
  return http.post('/tools/fond',params)
} 

// 获取所有用户信息
apiFun.getAllUsers = params => {
  return http.get('/users/'+params.a1+'/'+params.a2+'?'+params.other)
}

// 获取所有业务员信息
apiFun.getAllWorkers = params => {
  return http.get('/workers/'+params.a1+'/'+params.a2+'?'+params.other)
}

//获取所有订单信息
apiFun.getAllBooks = params => {
  return http.get('/books/'+params.a1+'/'+params.a2+'?'+params.other)
}

//获取所有委托
apiFun.getAllEntrusts = params => {
  return http.get('/entrusts/'+params.a1+'/'+params.a2+'?'+params.other)
}

//获取我的关注楼盘
apiFun.getAllFond = params =>{
  return http.get('/tools/'+params.id)
}

//封号或解封
apiFun.dealUser = params =>{
  return http.post('/users/dealUser',params)
} 

//封号或解封
apiFun.dealWorker = params =>{
  return http.post('/workers/dealWorker',params)
} 

//修改用户信息
apiFun.updateUser = params =>{
  return http.post('/users/update',params)
} 

//修改业务员信息
apiFun.updateWorker = params =>{
  return http.post('/workers/update',params)
} 

//修改新房信息
apiFun.updateHouse = params =>{
  return http.post('/houses/update',params)
} 

//修改二手房信息
apiFun.updateSecond = params =>{
  return http.post('/seconds/update',params)
} 

//修改租房信息
apiFun.updateRent = params =>{
  return http.post('/rents/update',params)
} 

//增加业务员
apiFun.addWorker = params =>{
  return http.post('/workers/addNew',params)
} 

//增加二手房
apiFun.addSecond = params =>{
  return http.post('/seconds/addNew',params)
} 

//增加二手房图片
apiFun.addSecondImg = params =>{
  return http.post('/seconds/addNewImg',params)
} 

//增加二手房图片
apiFun.addTest = params =>{
  return http.get('/seconds/addTest',JSON.stringify(params))
  // return http.post('/seconds/addTest',params)
} 

//增加新房
apiFun.addHouse = params =>{
  return http.post('/houses/addNew',params)
} 

//增加二手房
apiFun.addSecond = params =>{
  return http.post('/seconds/addNew',params)
} 

//退款
apiFun.refund = params =>{
  return http.post('/books/refund',params)
} 

//取消订单
apiFun.cancelBooks = params =>{
  return http.post('/books/cancelBooks',params)
} 

//通过或否决委托
apiFun.dealEntrust = params =>{
  return http.post('/entrusts/dealEntrust',params)
} 

//获取首页图片推荐表
apiFun.getHomepageImg = () =>{
  return http.get("/tools/homepage")
}

export default apiFun;