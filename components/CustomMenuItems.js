import { MenuOption } from "react-native-popup-menu";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";


export const MenuItem = ({
  text,
  action,
  value,
  icon
}) => {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <MenuOption onSelect={(value) => action(value)}>
      <View style={{justifyContent: "space-between"}} className="px-4 py-1 flex-row items-center">
        <Text style={{fontSize: hp(2), fontFamily: "Poppins-Regular"}} className="text-white font-semibold">{text}</Text>
        {icon}
      </View>
    </MenuOption>
  )
}