import updateAnimal from "../../../server/mongodb/actions/updateAnimal.js";
import deleteAnimal from "../../../server/mongodb/actions/deleteAnimal.js";
import createAnimal from "../../../server/mongodb/actions/createAnimal.js";

export default async function handler(req, res) {
    if (req.method === "PATCH") {
        try {
            const body = JSON.parse(req.body)
            const response = await updateAnimal(body);
            return res.status(200).json({"status": "success"});
        } catch (e) {
            console.log(e.message.toString());
            if (e.message.toString() === "Error: Animal Not Found") {
                return res.status(400).json({"status": "Animal Not Found."});
            }
            else return res.status(500).json({"status": "Failed to update animal due to database issues."});
        }
    } else if (req.method === 'DELETE') {
        try {
            const response = await deleteAnimal(req.query);
            return res.status(200).json({"status": "success"});
        } catch (e) {
            console.log(e.message.toString());
            if (e.message.toString() === "Error: Animal Not Found") {
                return res.status(400).json({"status": "Animal Not Found."});
            }
            else return res.status(500).json({"status": "Failed to delete animal due to database issues."});
        }
    } else if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body)
            const response = await createAnimal(body);
            return res.status(200).json({"status": "success"});
        } catch (e) {
            console.log(e.message.toString());
            if (e.message.toString() === "Error: Owner Not Found") {
                return res.status(400).json({"status": "Owner Not Found."});
            }
            else return res.status(500).json({"status": "Failed to create animal due to database issues."});
        }
    }
}
