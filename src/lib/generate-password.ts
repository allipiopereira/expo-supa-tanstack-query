type Props = {
  length: number;
};

export const generatePassword = ({ length }: Props): string => {
  let charset = "";
  let newPassword = "";

  charset += "0123456789";
  charset += "abcdefghijklmnopqrstuvwxyz";
  charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < length; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return newPassword;
};
