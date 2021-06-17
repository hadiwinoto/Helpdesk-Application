const db = require("../Models");
const config = require("../config/auth.config");
const nodemailer = require('nodemailer');
const User = db.users_model;
const Role = db.roles_model;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
function email_send (to,token,username) {
    var links = 'http://192.168.43.5:8000'
    var linkLocal = 'http://localhost:8000';

    const b64Encode = Buffer.from(token).toString('base64')
    const link = `${linkLocal}/home/verify/${b64Encode}/${username}`;
    const subject = 'Account Verification Complaint App';
    let html = "<h2>Verification address your Email</h2> <br>";
          html += "<a href="+link+" style='width:200px; font-size: 18px; color: white; text-align: center; text-decoration: none; padding: 10px; background:#314c69;'>Click Link For Activation Account</a>";
          html += "<div style='margin-top:50px;'><hr>";
          html += `<h5>© Copyright Customer ${new Date().getFullYear()} Complaint developed By Fajrin</h5></div>`;
    const user = "muhammad.fajrin.dev1997@gmail.com";
    const pass = "foxaband123";

    var transporter = nodemailer.createTransport('SMTP',{
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });

    var mailOptions = {
        from: user,
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err)
        }else{
            console.log(err)
        }
    });
}

exports.verify = async (req,res)=>{

    User.findOne({
        where: {
          username: req.query.username
        }
    })
    .then(user =>{
       
    if(!user){
        return res.status(401).send({ status: -1,message: "Account not Found" });
    }  
   
       if(req.query.token === user.password){
            User.update({ active : 1 },
                { where : {username : req.query.username}
            }).then(update =>{
                
                var token = jwt.sign({id:req.query.username},config.secret,{
                    expiresIn: 86400 // 24 hours
                    // expiresIn: 3600 // 1 hours
                    // expiresIn: 500
                });

                user.getRoles().then(data=>{
                 
                    return res.status(200).send({ status: 1,
                         message: "Account Activation Successfully",
                         userInfo : {
                             username: user.username,
                             email:user.email,
                             accessToken: token,
                             roles: ['ROLE_'+data[0].name.toUpperCase()]
                         }
                        })

                })
            })
        }else{
            return res.status(401).send({ status: -1,message: "Token Not Valid" });
       }
    })
    .catch(err => {
        res.status(500).send({ status: false,message: err.message });
    });

}

exports.signup  = (req,res)=>{

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        fullname : req.body.fullname,
        address : req.body.address,
        gender : req.body.gender,
        mobile_number: req.body.mobile_number,
        photo_profile: req.body.photo_profile,
        active : 0
    })
    .then(user =>{
       
    email_send(user.dataValues.email,user.dataValues.password,user.dataValues.username);
    
        if(req.body.roles){
            Role.findAll({
                where : {
                    name: {
                        [Op.or] :req.body.roles
                    }
                }
            })
            .then(roles =>{
                user.setRoles(roles).then(()=>{
                    res.send({ status : 1,message: "User was registered successfully!,  Please activation your account" });
                })
            })
        }else{
           user.setRoles(req.body.username =='m.fazrin.fahlevi' ? [2] : [3]).then(() => {
                res.send({ status: 1,message: "User was registered successfully! Please activation your account" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });

}

exports.signin = (req, res) => {
    User.findOne({
        where: {
          username: req.body.username
        }
    })
    .then(user =>{
        if(!user){
            return res.status(200).send({ status:false,message: "User Not found." });
        }

        if(user.active == 0){
            return res.status(200).send({
                status: false,
                message: "Account non Active, you Can Check Gmail for Link Activation"
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
            
        if (!passwordIsValid) {
            return res.status(200).send({
            accessToken: null,
            status:false,
            message: "Invalid Password!"
            });
        }

        var token = jwt.sign({id:user.id},config.secret,{
            // expiresIn: 86400 // 24 hours
            expiresIn: 3600 
        });

        var authorities = [];

        user.getRoles().then(roles =>{

            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                status: 1,
                userInfo:{
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                }
            });
        })

    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}