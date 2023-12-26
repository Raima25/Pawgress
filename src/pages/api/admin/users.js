import readUsers from '../../../../server/mongodb/actions/readUsers.js' 

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // console.log("users handler");
            // console.log(req.query);
            const {page = 1, limit = 100000} = req.query;
            const users = await readUsers(page, limit);
            // console.log(users);
            return res.status(200).json(users)
        } catch (e) {
            return res.status(500).json({status: 'failure'})
        }
    }
}