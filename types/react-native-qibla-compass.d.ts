declare module "react-native-qibla-compass" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  interface QiblaCompassProps {
    style?: ViewStyle;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    radius?: number;
    textStyles?: object;
    showQiblaDegree?: boolean;
    showNorthDegree?: boolean;
  }

  export default class QiblaCompass extends Component<QiblaCompassProps> {}
}
