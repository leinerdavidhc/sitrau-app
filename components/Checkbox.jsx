import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export function Checkbox({ label, onValueChange }) {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
    if (onValueChange) {
      onValueChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleCheckbox}
      className="flex-row items-center my-2"
    >
      <View
        className={`w-6 h-6 rounded-md border ${
          checked ? "bg-orange-600 border-orange-600" : "border-black"
        } justify-center items-center mr-1`}
      >
        {checked && (
          <Text className="text-white text-base">
            <Entypo name="check" size={24} color="white" />
          </Text>
        )}
      </View>
      <Text className="text-sm">{label}</Text>
    </TouchableOpacity>
  );
}
