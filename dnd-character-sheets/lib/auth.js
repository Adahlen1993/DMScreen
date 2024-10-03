import jwt from 'jsonwebtoken';

export function authenticate(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;  // Return the decoded user info (userId, isAdmin)
  } catch (error) {
    return null;
  }
}
