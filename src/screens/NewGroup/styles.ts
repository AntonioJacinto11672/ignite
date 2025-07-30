import { UsersThreeIcon } from "phosphor-react-native";
import styled from "styled-components/native";


export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.GRAY_600};
padding: 24px;
`


export const Content = styled.View`
flex: 1;
justify-content: center;
`


export const Icon = styled(UsersThreeIcon).attrs(({ theme }) => ({
    size: 56,
    color: theme.COLORS.GREEM_700
}   ))`

align-self: center;`;