import { object, string } from 'yup';

export default object().shape({
  email: string()
    .required('Email is required')
    .email('Email is invalid'),
  password: string()
    .required('Password is required')
    .min(8, 'Invalid password length')
});