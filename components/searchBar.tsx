import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

interface props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: props) => {
  return (
    <View className="bg-dark-200 flex-row items-center rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
        className="ml-2 flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;
