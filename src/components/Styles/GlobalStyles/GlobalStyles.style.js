import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    :root {
        /* color */
        --primary: #039091;
        --dark: #333;
        --light-dark: #666;
        --black: black;
        --white: white;

        /* font */
        --font-family: "Poppins", sans-serif;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        scroll-behavior: contain;
    }

    body {
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: var(--dark);
        text-rendering: optimizeSpeed;
    }

    a {
        text-decoration: none;
        color: var(--dark)
    }
`