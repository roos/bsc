
app.route.get('/realdatamodels/:id_field', async (req) => {
  let result = await app.model.RealDataModels.findOne({
    condition: {
      id_field: req.query.id_field
    }
  })
  return result
})

app.route.get('/realdatamodels', async (req) => {
  let limit = req.query.limit ? req.query.limit : 50
  let offset = req.query.offset ? req.query.offset : 0
  
  let count = await app.model.RealDataModels.count({})
  let result = await app.model.RealDataModels.findAll({
    limit,
    offset
  })

  return {
    count,
    models: result
  }
})