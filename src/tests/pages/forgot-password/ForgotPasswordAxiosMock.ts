import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const ForgotPasswordAxiosMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the forgotPassword endpoint
  ForgotPasswordAxiosMock.onPost('/users/forgot-password').reply(200);
}

export const setupErrorAxiosMock = () => {
  // Mock the forgotPassword endpoint
  ForgotPasswordAxiosMock.onPost('/users/forgot-password').reply(400, {
    success: false,
    message: {
      value: 'Une erreur s\'est produite'
    }
  });
}

export default ForgotPasswordAxiosMock;