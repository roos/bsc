app.route.get('/notary/all',  async function (req) {
    return await app.model.Notary.findAll()
});
