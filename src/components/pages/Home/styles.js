import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;


  margin-top: 32px;

  `;

export const Content = styled.div`
  padding: 16px;
  width: 800px;

  background: ${({ theme }) => theme.colors.gray[700]};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary[200]};
  box-shadow: 0 0 5px 5px #7020c4, 0 0 10px 10px #7020c4, 0 0 20px 15px #7020c4, 0 0 80px 10px #7020c4;

`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  span {
    background: ${({ theme }) => theme.colors.gray[600]};
    padding: 6px 16px;
    border-radius: 6px;
    margin-top: 4px;
  }

  h2 {
    background: ${({ theme }) => theme.colors.gray[600]};
    padding: 6px 16px;
    border-radius: 6px;
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
  }
`;

export const Skills = styled.div`
  background: ${({ theme }) => theme.colors.gray[600]};
  padding: 6px 16px 16px 16px;
  border-radius: 6px;

  div {
    display: inline-flex;
    align-items: center;

    background: ${({ theme }) => theme.colors.gray[700]};
    padding: 4px 8px;
    border-radius: 6px;
    margin-right: 8px;
    margin-top: 8px;

    span {
      margin-left: 6px;
    }
  }
`;

export const GitRepos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 8px;
`;

export const CardRepo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 16px;

`;

export const CardRepoInfo = styled.div`
  display: flex;
  flex-direction: column;

  width: 45%;

  background: ${({ theme }) => theme.colors.gray[600]};
  border-radius: 6px;

  &:nth-child(n+3) {
    margin-top: 16px;
  }

  .content {
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .segunda-div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
    }
  }

  a {
    text-decoration: none;
  }

  > span {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 6px 0;
    border-radius: 6px 6px 0 0;

    background: ${({ theme }) => theme.colors.primary[500]};
  }

  img {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  p {
    color: white;
    background: ${({ theme }) => theme.colors.gray[700]};
    border-radius: 6px;

    padding: 4px 8px;
    text-align: center;
    font-size: 14px;
  }

  .action {
    display: flex;
    justify-content: center;

    margin-top: 14px;

    a {
      color: white;
      font-size: 14px;
      text-transform: uppercase;

      padding: 4px 12px;
      border-radius: 6px;
      border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    }
  }

`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 140px;

  span {
    color: white;
  }
`;

export const Stacks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  margin-top: 8px;
  span {
    background: ${({ theme }) => theme.colors.primary[400]};
    border-radius: 6px;
    margin-top: 8px;
    margin-right: 4px;
    padding: 4px 6px;
  }
`;

export const ContactMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 12px;
  gap: 16px;

  button {
    background: none;
    border: none;
    color: white;
  }
`;
