import styled from "styled-components";

export const StyledHome = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 96px);
  padding: 20px 10vw;
  gap: 20px;

  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 96px);
    padding: 20px 10vw;
    gap: 20px;
  }
  h4 {
    font-size: 22px;
    font-weight: 800;
    padding-bottom: 15px;
  }

  .link {
    color: #5353c4;

    &:hover {
      color: #3c3cb4;
    }
  }

  .user-box {
    width: calc(80vw);
    display: flex;
    justify-content: space-between;
    flex: 0 0 auto;
    background-color: rgba(85, 85, 85, 0.8);
    padding: 20px;
    border-radius: 30px;

    & > div {
      width: 60%;
    }

    & > button {
      width: 40%;
    }

    p {
      color: #b2b1b1;
    }

    h5 {
      display: flex;
      align-items: center;
      height: 20px;
      font-size: 16px;
      & > button {
        margin: 0px;
        align-items: center;
        height: 100%;
        background-color: transparent;
        border: none;
        color: var(--white);
        padding-left: 10px;

        & > svg {
          margin-top: 4px;
        }
      }
    }
  }

  .transactions-box {
    width: calc(80vw);
    height: calc(100vh - 300px);
    display: flex;
    flex-direction: column;
    align-items: space-between;
    flex: 0 0 auto;
    background-color: rgba(85, 85, 85, 0.8);
    padding: 20px;
    border-radius: 30px;

    nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;

      input {
        width: 100%;
        height: 45px;
        border-radius: 30px;
        border: none;
        padding: 20px;
        box-sizing: border-box;
        max-width: 200px;
      }

      section {
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    ul {
      overflow-y: scroll;
      width: 100%;
    }

    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #7a7a7a;

      & > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      span {
        display: flex;
        gap: 10px;
      }
    }
  }
`;
