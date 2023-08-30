export const value_multiplier = (base_value: number, multiplier: number, offset: number) => {
    const rate = 0.1;

    let result = ( base_value + offset )*( rate )*( multiplier )

    return Math.round(result * 10) / 10
}