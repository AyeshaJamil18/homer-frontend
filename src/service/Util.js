import bcrypt from 'bcryptjs';


const getRandomString = () => bcrypt.genSaltSync(10).substr(7);

export default {
    getRandomString
};
