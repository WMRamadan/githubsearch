const config = require('config');

const api_url = config.get('api.url');

export default async function handler(req, res) {
    const body = req.body
    const response = await fetch(api_url+'/repos/'+body.user);
    //Return the content of the data file in json format
    var data = await response.json()
    res.status(200).send(data);
}