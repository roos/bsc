module.exports = {
  addFile: async function(file, description) {
      let exists = await app.model.Notary.exists({file: file})
      if(exists) return 'Datei bereits vorhanden!'
      app.sdb.create('Notary', {
        id: app.autoID.increment('notary_max_id'),
        transactionId: this.trs.id,
        file: file,
        description: description,
        ownerId: this.trs.senderId,
        timestamp: this.trs.timestamp
      })
  }
}
