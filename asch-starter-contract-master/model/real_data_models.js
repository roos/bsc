module.exports = {
  name: 'real_data_models',
  fields: [
    {
      name: 'id_field',
      type: 'Number',
      not_null: true,
      primary_key: true
    },
    {
      name: 'corresponding_transaction',
      type: 'String',
      length: 64,
      not_null: true
    },
    {
      name: 'senderId_of_transaction',
      type: 'String',
      length: 50,
      not_null: true
    },
    {
      name: 'timestamp_of_transaction',
      type: 'Number',
      not_null: true 
    },
    {
      name: 'random_field',
      type: 'String',
      length: 4096,
      not_null: true
    }
  ]
}