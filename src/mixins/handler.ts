/**
 * 取值操作
 */
import jscalpel from 'jscalpel'
import {fromJS} from 'immutable'

class Handler {
  target: any
  _helper: any
  
  constructor(target) {
    this.target = fromJS(target).toJS()
    this._helper = jscalpel({
      target: this.target
    })
  }

  getMany(keys, callback) {
    this._helper = jscalpel({
      target: this.target,
      path: keys,
      success: function() {
        var result = Array.prototype.slice.call(arguments, 0, keys.length)
        callback.call(this, result)
      },
      error: function() {
        callback.call(this, null)
      }
    })
  }

  get(key) {
    return this._helper.get(key)
  }

  set(key, val) {
    this._helper.set(key, val)
  }

  del(key) {
    this._helper.del(key)
  }

  has(key) {
    return this._helper.has(key)
  }

  toJSON(){
    return this.target
  }

  // merge(...data){
  //   let tmp = {}
  //   data.map((val)=>{
  //     tmp = merge(tmp,val)
  //   })
  //   return merge(this.target,tmp)
  // }
}

export default Handler