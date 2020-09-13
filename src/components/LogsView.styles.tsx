import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  overflow: auto;

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
        background: #FEF8FA;
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
      display:flex;
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
