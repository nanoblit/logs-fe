import styled from "styled-components";

import { LoadingState } from "../actions/types";

type WrapperProps = {
  isLoading: LoadingState;
};

export const Wrapper = styled.main<WrapperProps>`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;

  ${({ isLoading }) =>
    isLoading
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
    height: 100%;
    overflow: auto;

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
    margin: 1rem 0;

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
