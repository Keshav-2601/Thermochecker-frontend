import dotenv from 'env';
export async function jsonAuthentication_Authorization(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).send("unauthorized");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)//it provides the email,password informations 
        req.user=decoded//here i wiill make one property for req object called user which will store the decoded objects data in it .
        //whihc can be later use to Authorized globally
        //so then i can simply 
        next();
    } catch (error) {
        console.log("Error happended in Token decoding",error);
        return res.status(403).send("Unathorized Token");
    }
}