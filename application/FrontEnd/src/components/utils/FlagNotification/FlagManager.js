import { EventEmitter } from "events"
const createID = () => {
  const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
  return pattern.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const FlagTypes = {
  ALERT: "alert",
  SUCCESS: "success",
  FAIL: "fail",
  INFO: "info",
  CHANGE: "change",
}
class FlagManager extends EventEmitter {
  constructor(props) {
    super(props)

    this.noticationList = []
  }

  componentDidMount() {}
  componentWillUnmount() {}

  createFlag(notification) {
    const defaultNotify = {
      id: createID(), // Make a generic ID for the Flag
    }
    // console.log("Created Flag")
    var maxSize = 7
    if(this.noticationList.length===maxSize){
      //First pop one
      this.noticationList.pop()

    }

    this.noticationList.push(Object.assign(defaultNotify, notification))
    this.emitChange()
  }
  info(message, flagTime) {
    this.createFlag({
      type: FlagTypes.INFO,
      message,
      flagTime,
    })
  }
  success(message, flagTime) {
    this.createFlag({
      type: FlagTypes.SUCCESS,
      message,
      flagTime,
    })
  }
  fail(message, flagTime) {
    this.createFlag({
      type: FlagTypes.FAIL,
      message,
      flagTime,
    })
  }
  alert(message, flagTime) {
    this.createFlag({
      type: FlagTypes.ALERT,
      message,
      flagTime,
    })
  }
  clearCache() {
    this.noticationList.length = 0

    while (this.noticationList.length > 0) {
      this.noticationList.pop()
    }
    this.emitChange()
  }
  remove(notification) {
    this.noticationList = this.noticationList.filter(
      n => notification.id !== n.id
    )
    //console.log("Attempting to remove(Manager)...")
    this.emitChange()
  }

  emitChange() {
    this.emit(FlagTypes.CHANGE, this.noticationList)
  }

  addChangeListener(callback) {
    this.addListener(FlagTypes.CHANGE, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(FlagTypes.CHANGE, callback)
  }
}
export default new FlagManager()
