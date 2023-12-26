import readTrainingLogs from '../../../../server/mongodb/actions/readTrainingLogs.js'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const {page = 1, limit = 100000} = req.query;
            const trainingLogs = await readTrainingLogs(page, limit);
            return res.status(200).json(trainingLogs)
        } catch (e) {
            return res.status(500).json({status: 'failure'})
        }
    }
    
}