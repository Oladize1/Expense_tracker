import jwt from 'jsonwebtoken'

export const generateToken = (userId:string | number) => {
    const secret = process.env.SECRET 
    if (!secret) {
        throw new Error("JWT SECRET is not defined in environment variables");
    }
    return jwt.sign({id: userId}, secret ,{expiresIn: '30d'})
}