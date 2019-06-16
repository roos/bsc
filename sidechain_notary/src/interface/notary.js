const AschJS = require('asch-js')
const axios = require('axios')

/*
Gibt alle hinterlegten Dateien aus. (limitiert auf 50!)
*/
app.route.get('/allfiles', async function(req) {
  // load all
  let files = await app.model.Notary.findAll({
    limit: 50,
    offset: 0,
/*
ergibt einen Fehler, dass timestamp nicht existiert...
    sort: {
      timestamp: -1
    }*/
  })
  return files
})

/*
Sucht eine bestimmte Datei und gibt diese mit den entsprechenden Informationen zurueck.
*/
app.route.get('/file/:file', async function(req) {
  return await app.model.Notary.findOne({
    condition: { file: req.params.file }
  })
})

/*
Sucht einen bestimmten Benutzer und gibt diesen mit allen registrierten Dateien zurueck.
*/
app.route.get('/user/:user', async function(req) {
  return await app.model.Notary.findAll({
    condition: { ownerId: req.params.user }
  })
})

/*
Fuegt eine neue Datei mit einem Kommentar der Sidechain hinzu.
*/
app.route.get('/addfile/:file/:comment/:secret', async (req) => {
  let fee = String(0.1 * 1e8)
  let type = 1001 /* custom contract type */
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
      console.log(JSON.stringify('return: ' + response.data))
      return JSON.stringify(response.data)
    })
    .catch((error) => {
      console.log(error.message)
      return error.message
    })
})
