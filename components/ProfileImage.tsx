import React from "react";
import { Image } from "react-native";

export function ProfileImage({
  account,
  size = "Small",
  source,
  ...props
}: {
  account?: string;
  source?: any;
  size?: "Small" | "Medium" | "Large";
}) {
  const renderSource = source || {
    uri:
      (typeof window === "undefined" ? "" : window.location.origin) +
      `/profiles/${account}.jpeg`,
  };
  return <Image source={renderSource} {...props} />;
}
