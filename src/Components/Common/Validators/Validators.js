
export const requiredField = (value) => {
    if (value) {
        return undefined
    }
    return "Это обязательное поле"
}

export const checkLenghtCreator = (minLenght, maxLenght) => (value) => {
    if (value && value.length > maxLenght) {
        return `Максимальная длинна - ${maxLenght}`
    }
    if (value && value.length < minLenght) {
        return `Минимальная длинна - ${minLenght}`
    }
    return undefined
}