import jwt from 'jsonwebtoken';
import env from '../../config/env.js';

export const generateToken = (user)=>{
  return jwt.sign(
    {_id:user._id},
    env.accessTokenSecret,
    {expiresIn:'30m'}
  );
};