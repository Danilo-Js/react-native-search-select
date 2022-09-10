import {
  TextProps,
} from 'react-native';

export interface IconProps extends TextProps {
  /**
   * Size of the icon, can also be passed as fontSize in the style object.
   *
   * @default 12
   */
  size?: number | undefined;

  /**
   * Name of the icon to show
   *
   * See Icon Explorer app
   * {@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}
   */
  name: string;

  /**
   * Color of the icon
   *
   */
  color?: ColorValue | number | undefined;
}