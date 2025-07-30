import React from 'react';
import { View, Text, TextInputProps } from 'react-native';
import { Container } from './styles';
import { useTheme } from 'styled-components/native';
import theme from 'src/theme';



export function Input({ ...rest }: TextInputProps) {
    const { COLORS } = useTheme();
    return (
        <Container
            placeholderTextColor={COLORS.GRAY_300}
            {...rest} />
    )
}