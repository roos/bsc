module.exports = {
  functionName: async function (parameter_1) {
    // validate parameter
    app.validate('string', parameter_1, { length: { maximum: 4096 }})

    // lock contract call for this sender for one block interval (~10 seconds)
    app.sdb.lock(`functionName@${this.trs.senderId}`)

    let id_field = app.autoID.increment('realmodel_max_id')
    let corresponding_transaction = this.trs.id
    let senderId_of_transaction = this.trs.senderId
    app.logger.info(`block: ${JSON.stringify(this.trs, null, 2)}`)
    let timestamp_of_transaction = this.trs.timestamp

    // create DB entry
    app.sdb.create('RealDataModel', {
      id_field: id_field,
      corresponding_transaction: corresponding_transaction,
      senderId_of_transaction: senderId_of_transaction,
      timestamp_of_transaction: timestamp_of_transaction,
      random_field: parameter_1
    })
  }
}
