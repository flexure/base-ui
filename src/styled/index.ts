import * as EmotionStyled from "@emotion/styled";
import { CreateStyled } from "@emotion/styled";
import { ITheme } from "./Theme";

const styled = EmotionStyled.default as CreateStyled<ITheme>;

export { styled };
export * from "./Theme";
