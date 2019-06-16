module.exports = {
  addfile: async function(file, description) {
    app.sdb.lock('notary.addfile@' + file)
    let exists = await app.model.Notary.exists({file: file})
    if (exists) return 'File already registered'
    app.sdb.create('Notary', {
      id: app.autoID.increment("notary_max_id"),
      transactionId: this.trs.id,
      file: file,
      description: description,
      ownerId: this.trs.senderId,
      timestamp: this.trs.timestamp
    })
  }
}
