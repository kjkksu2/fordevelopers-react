// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColors: {
      main: string;
      lighter: string;
      darker: string;
    };
    textColors: {
      main: string;
    };
  }
}
