import bcrypt from "bcryptjs";
import deleteUser from "../../../server/mongodb/actions/deleteUser.js";
import createUser from "../../../server/mongodb/actions/createUser.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        // create user
        try {
            const body = JSON.parse(req.body)
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(body.password, salt);
            body.password = hash;
            const response = await createUser(body);
            return res.status(200).json({"status": "success"});
        } catch (e) {
            if (e.message.toString() === "Error: User exists already") {
                return res.status(400).json({"status": "Failed to create because user exists already"});
            } else {
                return res.status(500).json({"status": "Failed to create because external issues"});
            }
        }
    } else if (req.method === "DELETE") {
        // deletes a user
        try {
            const response = await deleteUser(req.query);
            return res.status(200).json({"status": "success"});
        } catch (e) {
            if (e.message.toString() === "Error: User Not Found") {
                return res.status(400).json({"status": "User Not Found."});
            } else {
                return res.status(500).json({"status": "Failed to update animal due to database issues."});
            }
        }
        
    }
}