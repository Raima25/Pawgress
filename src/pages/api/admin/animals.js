import readAnimals from '../../../../server/mongodb/actions/readAnimals.js'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const {page = 1, limit = 100000} = req.query;
            const animals = await readAnimals(page, limit);
            return res.status(200).json(animals)
        } catch (e) {
            return res.status(500).json({status: 'failure'})
        }
    }
}