import { DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    android: {
        regular: {
            fontFamily: 'Comic Sans MS',
            fontWeight: 'normal',
        },
    }
}

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#38E579',
        primary: '#330E65',
        surface: '#fff',
        error: 'red',
        text: '#000',
        activeText: '#fff',
    },
    fonts: configureFonts(fontConfig),
}
export default Theme;