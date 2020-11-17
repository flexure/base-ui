import { twitch } from "react-icons-kit/fa/twitch";
import { arrows_squares } from "react-icons-kit/linea/arrows_squares";
import { enlarge } from "react-icons-kit/icomoon/enlarge";
import { dollar } from "react-icons-kit/fa/dollar";
import { clipboard } from "react-icons-kit/ionicons/clipboard";

export const IconSet = {
	twitch,
	arrows_squares,
	enlarge,
	dollar,
	clipboard,
};

type TypeIconSet = typeof IconSet;

export type IconSetType = Extract<keyof TypeIconSet, keyof TypeIconSet>;
