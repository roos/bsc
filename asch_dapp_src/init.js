module.exports = async function () {
  app.registerContract(1002, 'notary.addFile')

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
