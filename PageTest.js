/*
 * @Author: WangYu 
 * @Date: 2019-07-23 10:32:45 
 * @Last Modified by: WangYu
 * @Last Modified time: 2019-07-23 15:21:23
 */
export default {
  data() {
    return {
      websock:null,
      text:'',
      flag:null
    }
  },
  computed: {

  },
  methods: {
    threadPoxi(){  // 实际调用的方法
      //参数
      const agentData = "Hello WebSockets!";
      console.log('判断',this.websock.readyState,this.websock.OPEN,this.websock.CONNECTING)
      //若是ws开启状态
      if (this.websock.readyState === this.websock.OPEN) {
        this.text += `连接正常，发送数据`
        this.websocketsend(agentData)
      }
      // 若是 正在开启状态，则等待300毫秒
      else if (this.websock.readyState === this.websock.CONNECTING) {
        let that = this;//保存当前对象this
        setTimeout(function () {
          that.websocketsend(agentData)
        }, 300);
        this.text += `正在连接中，请勿频繁操作`
      }
      // 若未开启 ，则等待500毫秒
      else {
        this.text += `开启ws失败，五秒后尝试重连`
        this.initWebSocket();
        let that = this;//保存当前对象this
        setTimeout(function () {
          that.websocketsend(agentData)
        }, 5000);
      }
    },
    initWebSocket(){ //初始化weosocket
      const wsuri = `ws://127.0.0.1:3000`//这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let data = "Hello WebSockets!"
      this.websocketsend(data)
    },
    websocketonerror(){//连接建立失败重连
      console.log('连接建立失败重连')
      this.text += '与ws://127.0.0.1:3000连接建立失败，正在重连'
      this.initWebSocket()
    },
    websocketonmessage(e){
      let _this = this //数据接收
      console.log('_this',e.data)
      _this.text += `数据返回:${e.data}`
      // 目前不确定是需要引入store
      // if (e.data == '连接成功') {//这个判断是我业务需求才加的
      //   return
      // }
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接', e)
    },
    setInterval() {
      this.flag = setInterval(() => {
        this.threadPoxi()
      },3000)
    },
    noInterval() {
      clearInterval(this.flag)
    }

  },
  mounted() {
    // this.set()
    
  },
  created() {
    this.initWebSocket()
  },
  destroyed() {
    // 清除ws
    this.noInterval()
  },
}
