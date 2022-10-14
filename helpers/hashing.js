const bcrypt = require('bcryptjs')
const saltRounds = 10;

const hashGenerate = async (plainPassword) =>{
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword,salt);
    return hash;
}
 const hashValidator =  async (plainPassword,hashedpassword)=>{
    try{
        // const result = await bcrypt.compare(plainPassword,hashedpassword);
        const result = (plainPassword === hashedpassword);
        return result;
    }catch(error){
res.send(error)
    }
const result = await bcrypt.compare(plainPassword,hashedpassword);
return result;
 }
 module.exports.hashGenerate = hashGenerate; 
 module.exports.hashValidator = hashValidator; 