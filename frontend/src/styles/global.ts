import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    *{
        margin: 0px;
        padding: 0px;
        list-style: none;
        font-family: 'IBM Plex Sans', sans-serif;
        box-sizing: border-box;
    }

    button:hover{
      cursor: pointer;
      filter: brightness(1.2)
    }

    :root{
        --toastify-color-dark: #222222;
        --white: rgb(232, 230, 227);
        --dark-gray: #212529;
    }

    body{
      background-color: black;
      color: var(--white);
      height: 100vh;
      background-image: url("https://ng.cash/_nuxt/img/banner-beneficios.4cc079f.png");
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
    }

    *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #202324;
    border-radius: 10px;
    border: 0px solid #ffffff;
  }
`;
