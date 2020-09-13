import styled from "styled-components";

type WrapperProps = {
  isCentered: boolean;
};

export const Wrapper = styled.main<WrapperProps>`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;

  ${({ isCentered }) =>
    isCentered
      ? `
    justify-content: center;
    align-items: center;
  `
      : ""}

  .loader {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .table {
    overflow: auto;
    margin-bottom: 1rem;

    .head {
      font-weight: bold;
    }

    .row {
      &:hover {
        background: #fef8fa;
      }
    }
  }

  .cards {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;

    .card {
      width: 100%;
      height: 20rem;
      margin-right: 1rem;
      display: flex;
      flex-direction: column;

      &:last-child {
        margin-right: 0;
      }

      .card-content {
        overflow-y: auto;
        height: 100%;
      }
    }
  }
`;
