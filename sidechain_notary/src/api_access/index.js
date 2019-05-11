const axios = require('axios')
const aschJS = require('asch-js')
const program = require('commander')

let dappId = '166d88dacc1d87125d730cb4449bcfc7108ae0f2a33a03ffaa26d23a943b4f03'
//let dappId = 'test-EVZuvlhYOeRk'
let mySecret = 'sponsor wall again lonely parade young patrol baby expire bean fall round'

let post = (file, comment) => {
  console.log('post')
  const signedTransactionsUrl = `http://localhost:4096/api/dapps/${dappId}/transactions/signed`
  let option = {
    fee: '100000000',
    type: 1000,
    args: JSON.stringify([file, comment])
  }

  // sign transaction
  let transaction = aschJS.dapp.createInnerTransaction(option, mySecret)
  let data = {
    transaction: transaction
  }
  let headers = {
    headers: {
      'magic': '594fe0f3', // Mainnet: 5f5b3cf5
      'version': ''
    }
  }

  // send signed transaction to Sidechain
  return axios.put(signedTransactionsUrl, data, headers)
    .then((result) => {
      console.log('result:')
      console.log(JSON.stringify(result.data, null, 2))
    })
    .catch((error) => {
      console.log('Be sure to have the right "<dapp Id>" set!')
      console.error(error.message)
    })
} // let post = (title, text) => {


let get = (id) => {
  const url = `http://localhost:4096/api/dapps/${dappId}/file`
  return axios.get(url)
    .then((result) => {
      console.log(JSON.stringify(result.data, null, 2))
    })
    .catch((error) => {
      console.log('Be sure to have the right "<dapp Id>" set!')
      console.error(error.message)
    })
}

program
  .command('postFile [file] [comment]')
  .action(function(file, comment) {
    post(file, comment)
      .then(() => {})
  })

program
  .command('getFile [id]')
  .action(function(id) {
    get(id)
      .then(() => {})
  })

program.on('--help', function() {
  console.log('')
  console.log('    Examples:')
  console.log('    postArticle "hello" "my first article"')
  console.log('    getArticle 2')
  console.log('')
})

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)
