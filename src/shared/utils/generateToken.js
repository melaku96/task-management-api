import jwt from 'jsonwebtoken';

export const generateToken = (user)=>{
  return jwt.sign(
    {_id:user._id},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:'30m'}
  );
};