const AschJS = require('asch-js')
const axios = require('axios')

//getestet = ok
app.route.get('/allfiles', async function(req) {
  // load all
  let files = await app.model.Notary.findAll({
    limit: 50,
    offset: 0,
/*
ergibt einen Fehler, dass t.rimestamp nicht existiert...
    sort: {
      timestamp: -1
    }*/
  })
  return files
})

/*getestet = ok | es wird alles durchsucht (file, benutzer ...) und
immer nur der erste eintrag zurueck gegebene.*/
app.route.get('/file/:file', async function(req) {
  return await app.model.Notary.findOne({
    condition: { file: req.params.file }
  })
})

/*getestet = ok | es wird alles durchsucht (file, benutzer ...) und
immer nur der erste eintrag zurueck gegebene.*/
app.route.get('/user/:user', async function(req) {
  //return await app.model.Notary.findOne({file: req.params.file})
  //return "user vielleicht gefunden.";

  return await app.model.Notary.findAll({
    condition: { ownerId: req.params.user }
  })
})

/*app.route('/addFile/:file', async function(req) {
  .post(function(req, res) {
    res.send("der post bereich.");
  });
})*/

app.route.get('/addfile/:file/:comment/:secret', async (req) => {
  /*let result = { file: 'file123', comment: 'comment123', a: 'a: ' + req.params.a, b: 'b: ' + req.params.b }
  return result*/

  let fee = String(0.1 * 1e8)
  let type = 1000 /* custom contract type */
  let options = {
    fee: fee,
    type: type,
    args: JSON.stringify([req.params.file, req.params.comment])
  }
  let secret = req.params.secret
  let transaction = AschJS.dapp.createInnerTransaction(options, secret)


  let dappName = 'test-nDtTqaHrptvq'
  let url = `http://localhost:4096/api/chains/${dappName}/transactions/signed`
  let data = {
    transaction: transaction
  }
  let headers = {
    magic: '594fe0f3',
    version: ''
  }

  axios.put(url, data, headers)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      return JSON.stringify('return: ' + response.data)
    })
    .catch((error) => {
      console.log(error.message)
      return error.message
    })
})

app.route.get('/anmelden', async (req) => {
  let result = { benutzer: 'benutzer' }
  return result
})
