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

app.route.get('/addfile/:a/:b', async (req) => {
  let result = { file: 'file123', comment: 'comment123', a: 'a: ' + req.params.a, b: 'b: ' + req.params.b }
  return result
})

app.route.get('/anmelden', async (req) => {
  let result = { benutzer: 'benutzer' }
  return result
})
