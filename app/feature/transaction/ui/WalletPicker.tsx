import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuOptionCustomStyle,
  renderers,
  MenuTriggerProps,
} from "react-native-popup-menu";
import React from "react";
import StyledLabelInput from "components/StyledLabelInput";
import { Ionicons } from "@expo/vector-icons";
import colors from "constants/colors";
import { useAppSelector } from "store/hooks";
import { getAllWallets } from "store/reducers/wallets/selectors";

type Props = {
  value: string | undefined;
  style?: StyleProp<TextStyle>;
  onSelect: (walletId: number) => void;
};

const customOptionStyles: MenuOptionCustomStyle = {
  optionText: {
    fontSize: 15,
    padding: 15,
  },
};

const customTriggerStyle: MenuTriggerProps["customStyles"] = {
  TriggerTouchableComponent: TouchableOpacity,
};

const WalletPicker: React.FC<Props> = ({ value, onSelect, style }) => {
  const wallets = useAppSelector(getAllWallets);
  const walletArr = Object.values(wallets);

  return (
    <View>
      <Menu
        onSelect={onSelect}
        renderer={renderers.Popover}
        rendererProps={{
          placement: "auto",
          preferredPlacement: "bottom",
        }}
      >
        <MenuTrigger customStyles={customTriggerStyle}>
          <StyledLabelInput
            value={value}
            disabled
            style={style}
            placeholder='Wallet'
            inputStyle={styles.text}
            icon={<Ionicons name='wallet' size={24} color={colors.greenMint} />}
          />
        </MenuTrigger>
        <MenuOptions>
          <FlatList
            data={walletArr}
            renderItem={({ item }) => (
              <MenuOption
                text={item.walletName}
                value={item.walletId}
                customStyles={customOptionStyles}
              />
            )}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default WalletPicker;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
  },
});
