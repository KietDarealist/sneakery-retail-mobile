import {apiURl} from '../../constants';
import axios from 'axios';

const postSignIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiURl}/users/login`, {
      email: email,
      password: password,
    });
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const registerService = async (
  email: string,
  password: string,
  username: string,
  phoneNumber?: string,
  deviceId?: string,
) => {
  try {
    const response = await axios.post(`${apiURl}/users/register`, {
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      deviceId: deviceId,
    });
    if (response) return response;
  } catch (error) {
    console.log('REGISTER ERROR', JSON.stringify(error));
  }
};

const updateUserProfileService = async (
  accessToken: string,
  username: string,
  phoneNumber: string,
  address?: string,
) => {
  try {
    const response = await axios.put(
      `${apiURl}/users/`,
      {
        username: username,
        phoneNumber: phoneNumber,
        address: address,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response) return response;
  } catch (error) {
    console.log('EDIT PROFILE USER ERROR', error);
  }
};
const verifyOTPService = async (userId: string, code: string) => {
  try {
    const response = await axios.post(`${apiURl}/users/verifyOTP/${userId}`, {
      code: code,
    });
    if (response) return response;
  } catch (error) {
    console.log('Verify OTP Error', JSON.stringify(error));
  }
};

const reloadProfileService = async (userId: string) => {
  try {
    const response = await axios.get(`${apiURl}/users/${userId}`);
    if (response) return response;
  } catch (error) {
    console.log('Reload profile error', JSON.stringify(error));
  }
};

export {
  postSignIn,
  registerService,
  verifyOTPService,
  updateUserProfileService,
  reloadProfileService,
};
