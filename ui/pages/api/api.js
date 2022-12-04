export default async function handler(req, res) {
  const response = await fetch('http://localhost:3001/api/v1/users');
  //Return the content of the data file in json format
  var data = await response.json()
  res.status(200).send(data);
}