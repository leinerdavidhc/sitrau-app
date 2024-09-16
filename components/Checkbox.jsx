import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SecureStore from 'expo-secure-store';

export function Checkbox({ label, onValueChange,value }) {
  const [checked, setChecked] = useState(value);

  
  useEffect(() => {
    const loadStoredRememberMe = async () => {
      try {
        const storedRememberMe = await SecureStore.getItemAsync('rememberMe');
        if (storedRememberMe !== null) setChecked(storedRememberMe === 'true');
      } catch (error) {
        console.error("Error loading stored RememberMe", error);
      }
    };

    loadStoredRememberMe();
  }, []);

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
