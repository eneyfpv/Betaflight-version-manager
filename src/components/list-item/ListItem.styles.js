import styled from 'styled-components'

export const SmallSectionItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ selected }) =>
    selected &&
    `
      background-color: rgb(255, 145, 0, 0.2);
      &:hover {
        background-color: rgb(255, 145, 0, 0.2);
      }
  `}
`
