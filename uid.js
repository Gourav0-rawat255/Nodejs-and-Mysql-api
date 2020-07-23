const uid = require('uniqid')
const jwt = require('jsonwebtoken');

const tokken = jwt.sign({name:"Gourav"},'tokenfordoctorapp',{expiresIn: '7d'});
                     console.log(tokken);

                     

var id = uid();
console.log(id);
