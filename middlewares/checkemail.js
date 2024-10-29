export default async function checkemail(req, res, next) {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).send('Email is required');
        }
        if (email.length < 7) {
            return res.status(400).send('Please check the email, it seems too short');
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Invalid email format');
        }
        next(); 
    } catch (error) {
        console.error("Error in email validation:", error);
        res.status(500).send("Server error during email validation");
    }
}
