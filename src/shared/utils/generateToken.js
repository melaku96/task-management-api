import jwt from 'jsonwebtoken';
import env from '../../config/env.js';

export const generateToken = (user)=>{
  return jwt.sign(
    {_id:user._id, role: user.role},
    env.accessTokenSecret,
    {expiresIn:'30m'}
  );
};