import React, { useCallback, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Label from "components/Label";
import colors from "constants/colors";
import { Category, transactionCategories, Transaction } from "modules/transactionCategories";
import Separator from "components/Separator";
import TransactionRowSelect from "./TransactionRowSelect";

const categoriesData = Object.values(transactionCategories).map((item) => ({
  name: item.name,
  id: item.id,
  label: item.label,
}));

const snapPoints = ["50%"];

type Props = {
  onSelect: (category: Category, type: Transaction) => void;
};

type refProps = {
  openSheet: () => void;
};

const TransactionBottomSheet: React.ForwardRefRenderFunction<refProps, Props> = (props, ref) => {
  const { onSelect } = props;
  const sheetRef = useRef<BottomSheet>(null);
  const [data, setData] = useState<Transaction[]>(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const openSheet = useCallback(() => {
    sheetRef.current?.expand();
  }, []);
  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    openSheet: () => openSheet(),
  }));

  const setTypeData = (id: number) => {
    const types = transactionCategories[id].types ?? [];
    setData(Object.values(types));
  };

  const clearCategory = () => {
    setData(categoriesData);
    setSelectedCategory(null);
  };

  const onRowPress = (item: Transaction | Category) => {
    if (!selectedCategory) {
      setTypeData(item.id);
      setSelectedCategory(item as Category);
    } else {
      onSelect(selectedCategory, item);
      closeSheet();
    }
  };

  const onClose = () => {
    setData(categoriesData);
    setSelectedCategory(null);
  };

  const renderItem = ({ item }: { item: Transaction | Category }) => (
    <TransactionRowSelect item={item} hideIcon={!!selectedCategory} onPress={onRowPress} />
  );

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  // TODO - IOS BUG - On first render, clicking on category will close sheet and not show the types (looks like it disappears), after that it will work normally
  // TODO - BUG - when there is textInput with autofocus prop the bottom sheet will open
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      onClose={onClose}
      backdropComponent={renderBackdrop}
      handleStyle={styles.handle}
    >
      <Label style={styles.title}>{"Pick category"}</Label>
      {!!selectedCategory && (
        <>
          <TransactionRowSelect item={selectedCategory} onPress={clearCategory} />
          <Separator />
        </>
      )}
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    backgroundColor: colors.grey3,
  },
  handle: {
    backgroundColor: colors.grey3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default React.forwardRef(TransactionBottomSheet);
