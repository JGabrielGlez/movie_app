import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text } from "react-native";

const _Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <ImageBackground
                className="mt-4 flex min-h-4 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
                source={images.highlight}>
                <Image
                  source={icons.home}
                  tintColor="#151312"
                  className="size-5"
                />
                <Text>Home</Text>
              </ImageBackground>
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
