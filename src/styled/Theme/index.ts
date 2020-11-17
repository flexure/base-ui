import { light } from "./light";

export interface ITheme {
	palette: {
		themePrimary: any;
		themeLighterAlt: any;
		themeLighter: any;
		themeLight: any;
		themeTertiary: any;
		themeSecondary: any;
		themeDarkAlt: any;
		themeDark: any;
		themeDarker: any;
		neutralLighterAlt: any;
		neutralLighter: any;
		neutralLight: any;
		neutralQuaternaryAlt: any;
		neutralQuaternary: any;
		neutralTertiaryAlt: any;
		neutralTertiary: any;
		neutralSecondary: any;
		neutralPrimaryAlt: any;
		neutralPrimary: any;
		neutralDark: any;
		black: any;
		white: any;
	};
}

class ThemeClass implements ITheme {
    // set light(theme) as default
	palette = light.palette;

	private static instance: ThemeClass;

	public static getInstance(): ThemeClass {
		if (!ThemeClass.instance) {
			ThemeClass.instance = new ThemeClass();
		}

		return ThemeClass.instance;
	}
}

export const Theme = ThemeClass.getInstance();

export * from "./dark";
export * from "./light";
