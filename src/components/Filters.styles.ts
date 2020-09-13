import styled from "styled-components";

export const Wrapper = styled.nav`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  .panel {
    display: flex;
    align-items: stretch;

    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 3rem;

      &:last-child {
        margin-right: 0;
      }
    }

    .change-page-buttons {
      display: flex;
      align-items: center;
    }

    .page-field {
      width: 3rem;
    }

    .page-arrow {
      margin-left: 1rem;
    }
  }
`;
