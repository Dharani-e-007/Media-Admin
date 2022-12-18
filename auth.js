import jwt from "jsonwebtoken"

export let  createToken = (payload)=>{
    let secretkey = "mysecretkey"
    let token  = jwt.sign(payload,secretkey)
    return token
}

export let verifyToken = (token) => {
    try {
        let result = jwt.verify(token, 'mysecretkey');
        return result
      } catch(err) {
        // err
      }
}