import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  // Handle login logic
  res.send({ message: 'Login successful' });
});

authRouter.post('/register', (req, res) => {
  // Handle registration logic
  res.send({ message: 'Registration successful' });
});

export default authRouter;