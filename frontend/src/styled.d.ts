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
    isHere: {
      online: string;
      offline: string;
    };
    postColors: {
      content: string;
      comment: string;
    };
    commentColors: {
      opponent: string;
      me: string;
    };
  }
}
