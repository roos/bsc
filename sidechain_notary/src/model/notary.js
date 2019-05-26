module.exports = {
  name: 'notarys',
  fields: [
     {
      name: 'id',
      type: 'BigInt',
      not_null: true,
      unique: true,
      primary_key: true
    },
    {
      name: 'transactionId',
      type: 'String',
      length: 64,
      not_null: true,
      unique: true
    },
    {
      name: 'file',
      type: 'String',
      length: 256,
      not_null: true
    },
    {
      name: 'description',
      type: 'Text',
      not_null: true
    },
    {
      name: 'ownerId',
      type: 'String',
      length: 50,
      not_null: true
    },
    {
      name: 'timestamp',
      type: 'Number',
      not_null: true
    }
  ]
}
