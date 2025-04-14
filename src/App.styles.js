import styled from 'styled-components'

export const App = styled.div`
  height: 100vh;
  min-width: 1000px;
  padding: 10px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 900;
  color: #ff9100;
  height: 40px;
`

export const RightMenuWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
`

export const GithubLink = styled.a`
  color: #fff;
  font-size: 12px;
`

export const User = styled.div`
  height: 25px;
  width: 25px;
  border: 2px solid #ff9100;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transtion: 0.2s;
  position: relative;

  ${({ signedIn }) =>
    signedIn &&
    `
    background-color: #ff9100;
    color: #202124;
  `}
`

export const UserActions = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: #202124;
  color: #fff;
  font-size: 12px;
  border: 1px solid #ff9100;
  border-radius: 5px;
  z-index: 10;
`

export const UserActionsItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #ff9100;
  }
  padding: 7px;
  font-weight: 400;
`

export const TableWrapper = styled.div`
  border: 2px solid #ff9100;
  border-radius: 25px;
  height: calc(100vh - 100px);
  display: flex;
  overflow: hidden;
`

export const SmallSection = styled.div`
  width: 250px;
  border-right: 1px solid #ff9100;
  padding: 10px;
  overflow-y: auto;
`
export const AddButton = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`

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

export const Textarea = styled.textarea`
  width: 100%;
  background: #202124;
  color: #fff;
  padding: 10px;

  &:focus {
    outline: 0;
  }
`

export const CodeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  position: relative;
`

export const CodeWrapperScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
`

export const CodeActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  gap: 10px;
  display: flex;
`

export const NoDataActions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
