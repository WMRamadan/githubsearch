const config = require('config');

const api_url = config.get('api.url');

export default async function handler(req, res) {
  const response = await fetch(api_url+'/users');
  //Return the content of the data file in json format
  var data = await response.json()
  res.status(200).send(data);
}