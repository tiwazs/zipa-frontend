export const GetTargetText = (text: string) => {
    switch(text){
        case "NONE":
            return ""
        case "SELF":
            return "Self"
        case "ALLY":
            return "Ally"
        case "ALLY_SUMMON":
            return "Allied Summons"
        case "ALLY_AROUND":
            return "Allies Around"
        case "ALLY_EXCEPT_SELF":
            return "Ally Except Self"
        case "ENEMY":
            return "Enemy"
        case "ENEMY_SUMMON":
            return "Enemy Summons"
        case "ENEMY_AROUND":
            return "Enemies Around"
        case "ANY":
            return "Anyone"
        case "ANY_AROUND":
            return "Anyone Around"
        case "ANY_EXCEPT_SELF":
            return "Anyone Except Self"
        case "ANY_SUMMON":
            return "Anyone Summoned"
        case "POINT":
            return "Point"
        case "POINT_ENEMY":
            return "Enemy at a Point"
        case "POINT_ALLY":
            return "Ally at a Point"
        case "AREA":
            return "Everyone in Area"
        case "AREA_ENEMY":
            return "Enemies in Area"
        case "AREA_ALLY":
            return "Allies in Area"
    }
}