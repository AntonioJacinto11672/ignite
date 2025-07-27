import styled from "styled-components/native";
import { CaretLeftIcon } from "phosphor-react-native";


export const Container = styled.View`
width: 100%;
flex-direction: row;
justify-content: center;
align-items: center;
`

export const Logo = styled.Image`
width: 46px;
height: 55px;
`

export const BackButton = styled.TouchableOpacity`
flex: 1;`

export const BackIcon = styled(CaretLeftIcon).attrs(({ theme }) => ({
    color: theme.COLORS.WHITE,
    size: 32
}))``