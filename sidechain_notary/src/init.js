module.exports = async function () {
  console.log('enter dapp init');

  app.registerContract(1000, 'notary.add_file');
  //app.registerFee(1000, '10000000', 'XAS');

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height);
  })
}
