 const axios = require('axios')

module.exports = {
    async list(req, res) {
        const {key, channelId} = req.body
        const data = await axios.get(`https://www.googleapis.com/youtube/v3/activities/?key=${key}&part=snippet&channelId=${channelId}`)
        return res.json(data.data)
    }
}