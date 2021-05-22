
const host = 'ws://172.20.29.109:5001/ws'

const createWs = function(path){
  const ws = new WebSocket(host + path)
  return ws
}

export default createWs