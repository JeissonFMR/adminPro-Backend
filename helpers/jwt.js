
const jwt = require('jsonwebtoken')

const generarJWT = async (usuario) => {
  const payload = {
    _id: usuario.id,
  }
  //firma del jwt
  const firma = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return firma
}
module.exports = { generarJWT }