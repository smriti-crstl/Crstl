import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalAppStyle = createGlobalStyle`
  ${normalize}
  body {
  background: ${(props) => props.theme.palette.background.PRIMARY};
  font-family: 'Inter', sans-serif, Roboto;
  }

  ::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background: transparent;
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    outline: 1px solid slategrey;
  }
  
  #front-chat-holder {
    div[role=button] {
      bottom: 66px !important;
    }
  }
`;
