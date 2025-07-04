export const CustomColors = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529',
    white: '#fff',
    black: '#000',
}

export const ColorsWithOpacity = (hexCode: string, opacity: number) => {
    const hex = hexCode.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // console.log(hex);
    // console.log(hex.substring(0, 2), 16 +" = "+ r);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}