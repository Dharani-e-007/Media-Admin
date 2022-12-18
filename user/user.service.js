import Usermodel from "./user.model.js"
import Newsmodel from "./news.model.js"
import bcrypt from "bcrypt"

const saltRounds = 10;

export let createUser = (data) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            // Store hash in your password DB.
            data.email = data.email.toLowerCase()
            data.password = hash
            var validdata = new Usermodel(data)
            validdata.save().then((newuser) => {
                resolve(newuser)
            }, (error) => {
                reject(error)
            })
        });

    })
}

export let findUser = (data) => {
    return new Promise((resolve, reject) => {
		 var query = { email: data.email }
        Usermodel.findOne(query).then((response) => {
		
            if (response) {
                bcrypt.compare(data.password, response.password, (err, result) => {
                    // result == true
                    if (result) {
                        resolve(response)
                    }
                    else {
                        reject()
                    }
                });
            }
            else {
                reject()
            }
        }, (error) => {
            reject(error)
        })
    })
}

export let removeUser = (data) => {
    return new Promise(function (resolve, reject) {
        var query = { email: data.email }
        Usermodel.deleteOne(query).then(function (result) {
            console.log("Result of user delete operation", result)
            if (result.deletedCount) {
                resolve()
            }
            else {
                reject()
            }
        }).catch(function (error) {
            reject()
            console.log("Error in use delete operation", error)
        })
    })
}
export let listAll = (data) => {
	return new Promise(function (resolve, reject) {
        var query = { }
        Usermodel.find(query).then(function (result) {
            if (result) {
                resolve(result)
            }
        }, function (error) {
            reject()
        })

    })
}

export let createNews = (data) => {
    return new Promise((resolve, reject) => {
       
            let validdata = new Newsmodel(data)
            validdata.save().then((news) => {
                resolve(news)
            }, (error) => {
                reject(error)
            })
        

    })
}

export let listAllNews = (data) => {
	return new Promise(function (resolve, reject) {
        var query = { }
        Newsmodel.find(query).then(function (result) {
            if (result) {
                resolve(result)
            }
        }, function (error) {
            reject()
        })

    })
}

export let removeNews = (data) => {
    return new Promise(function (resolve, reject) {
        var query = { id: data.id }
		
        Newsmodel.deleteOne(query).then(function (result) {
            console.log("Result of news delete operation", result)
            if (result.deletedCount) {
                resolve()
            }
            else {
                reject()
            }
        }).catch(function (error) {
            reject()
            console.log("Error in use delete operation", error)
        })
    })
}