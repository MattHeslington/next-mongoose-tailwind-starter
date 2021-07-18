import dbConnect from 'utils/dbConnect'
import Users from 'models/Users'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
        try {
            const users = await Users.find({}) /* find all the data in our database */
            res.status(200).json({ success: true, data: users })
        }
        catch (error) {
            res.status(400).json({ success: false })
        }
        break

        case 'POST':
        try {
            const users = await Users.create(
                req.body
            ) /* create a new model in the database */
            res.status(201).json({ success: true, data: users })
        }
        catch (error) {
            res.status(400).json({ success: false })
        }
        break

        default:
            res.status(400).json({ success: false })
        break
    }
}