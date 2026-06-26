import { View } from "react-native";

import { DatePickerInput } from "react-native-paper-dates";

type Props = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

export const DateInputView = ({ value, onChange }: Props) => {
  return (
    <View style={{ padding: 20 }}>
      <DatePickerInput
        locale="tr"
        label={"Tarih Seç"}
        value={value}
        onChange={onChange}
        inputMode="start"
      />
    </View>
  );
};
