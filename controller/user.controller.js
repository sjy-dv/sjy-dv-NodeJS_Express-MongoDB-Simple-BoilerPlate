const argon2 = require('argon2');
const Member = require('../models/Member');
const { createToken, createRefreshToken } = require('../utils/jwt');


module.exports = (function(){

    const U = {};

    U.UserJoin = async function(req, res){
        try {
            const {username} = req.body;
            const password = await argon2.hash(req.body.password);
            const sql = await Member.create({username, password});
            console.log(sql);
            await sql.save();
            res.status(200).send('success');
        } catch (error) {
           throw res.send('DB ERROR')
        }
    }

    U.UserLogin = UserLogin = async function (req,res) {
        try {
            const {username, password} = req.body;
            const result = await Member.findOne({username});
            if(!result){
                throw { code : 1 }
            }
            const compare = await argon2.verify(result.password, password);
            if(compare === true){
                const token = createToken(result.username);
                const retoken = createRefreshToken(result.username);
                res.send([token,retoken]);
            }else{
                throw res.send("PASSWORD WORNG");
            }
        } catch (error) {
            throw res.send("DB ERROR");
        }
    }

    U.AuthTest = async function(req,res){
        try {
            res.send('auth token check ok');
        } catch (error) {
            throw res.send("DB ERROR");
        }
    }

    return U;

})()
