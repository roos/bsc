module.exports = async function () {
  app.logger.info('init.js...')

  let contractNum = 1000
  let fileName = 'contract_file'
  let functionName = 'functionName'
  let whereToFindContract = `${fileName}.${functionName}`
  app.registerContract(contractNum, whereToFindContract)

  // set fee of 5 XAS for contract 1000
  let fee = String(5 * 1e8)
  let currency = 'XAS'
  app.registerFee(contractNum, fee, currency)
}
