var videodata = [
     {
        id:1,
        title:'第一节',
        videosrc:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        // videosrc:require('../assets/images/kaichang.mp4')
     },
     {
        id:2,
        title:'第二节',
        videosrc:'http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4'
        // videosrc:require('../assets/images/kaichang.mp4')
     },
     {
        id:3,
        title:'第三节',
        videosrc:'https://media.w3.org/2010/05/sintel/trailer.mp4'
        // videosrc:require('../assets/images/kaichang.mp4')
     }
]

// 书本详情
var bookdata = [
   {
      name:'CSS教程',
      bookimg:'https://img-blog.csdnimg.cn/20210605202346648.jpg',
      id:'1',
      bookurl:'http://image.cache.timepack.cn/nodejs.pdf'
   },
   {
      name:'Node.js',
      bookimg:'https://img-blog.csdnimg.cn/20210605202357842.jpg',
      id:'2',
      bookurl:'http://image.cache.timepack.cn/nodejs.pdf'
   },
   {
      name:'HTML5入门教程',
      bookimg:'https://img-blog.csdnimg.cn/20210605202357804.jpg',
      id:'3',
      bookurl:'http://image.cache.timepack.cn/nodejs.pdf'
   },
   {
      name:'JAVA',
      bookimg:require('../images/1.jpg'),
      id:'4',
      bookurl:'http://ptgmedia.pearsoncmg.com/images/013143697X/downloads/013143697X_book.pdf'
   },
]

// 对话提示框
var talkdata = [
   "欢迎您的到来！",
   "点击书籍可观看视频",
   "点击大电脑屏幕可查看控制台",
   "您有一个任务",
   "请完成视频学习",
   "具体详见控制台"
]
export{
   videodata,
   bookdata,
   talkdata
}