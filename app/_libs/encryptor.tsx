import bcrypt from 'bcryptjs';


export class Encryptor {

    static encryptPassword = async (password:string) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    static matchPassword = async (password: string, savedPassword: string) => {
        try{
            const result = await bcrypt.compare(password, savedPassword);

            return result;
        }catch(e) {
            return 0;
        }
    }
}