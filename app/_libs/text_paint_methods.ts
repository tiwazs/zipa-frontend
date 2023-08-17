
export const paintRarity = (rarity: string) => {
    switch(rarity){
        case "COMMON":
            return "text-gray-100";
        case "UNCOMMON":
            return "text-green-700";
        case "RARE":
            return "text-blue-600";
        case "EPIC":
            return "text-purple-700";
        case "LEGENDARY":
            return "text-orange-500";
        default:
            return "text-gray-100";
    }
}

export const paint_modifier = (_value: string) => {
    //const regex = /(?<sign>[\+\-])?(?<value>(\d+|ND))?(?<porcentage>\s*\%)?(?<max>\s*max)?/gm
    const regex = /(?<sign>[+-])?(?<value>(\d+|ND|MD|HP))?(\s*%)?(?<max>\s*max)?/gm
    const match = regex.exec(_value);
    const sign = match?.groups?.sign;
    const max = match?.groups?.max;
    const value = match?.groups?.value;

    if(sign === "+"){
        return 'text-green-500'
    }else if(sign === "-"){
        return 'text-red-500'
    }else if(max){
        return 'text-blue-500'
    }else if(!value){
        return 'text-yellow-500'
    }else{
        return 'text-gray-500'
    }
}