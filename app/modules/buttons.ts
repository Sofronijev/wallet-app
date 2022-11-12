import colors from "constants/colors";

export type ButtonType = "primary" | "danger";

export const buttonColor: Record<ButtonType, string> = {
  primary: colors.greenMint,
  danger: colors.danger,
};
