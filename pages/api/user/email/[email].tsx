import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../../services/userService";
import { createRouter } from "next-connect"
import { getToken } from "next-auth/jwt";

interface UserRequest extends NextApiRequest {
    query:
    {email: string;}
}

const router = createRouter<UserRequest, NextApiResponse>();

router.get( async (req: UserRequest, res: NextApiResponse) =>{
    const token = await getToken({ req })
    if (token) {
        // Signed in
        console.log("JSON Web Token", token)    
    }
    const user = await userService.findByEmail(req.query.email);
    return res.status(200).json(user);
});

export default router.handler({
    onNoMatch(req: UserRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});