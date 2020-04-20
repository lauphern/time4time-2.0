module.exports = {
  type: process.env.DB_TYPE,
  project_id: process.env.DB_PROJECTID,
  private_key_id: process.env.DB_PRIVKEYID,
  private_key: process.env.DB_PRIVKEY.replace(/\\n/g, '\n'),
  client_email: process.env.DB_CLIENTEMAIL,
  client_id: process.env.DB_CLIENTID,
  auth_uri: process.env.DB_AUTHURI,
  token_uri: process.env.DB_TOKENURI,
  auth_provider_x509_cert_url: process.env.DB_AUTHPROVIDERCERT,
  client_x509_cert_url: process.env.DB_CLIENTCERT
}