const sendOTPVerificationEmail = async () => {
  try {
    otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  } catch (error) {}
};
