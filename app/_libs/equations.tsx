export const value_multiplier = (base_value: number, multiplier: number, offset: number) => {
    const rate = 0.1;

    let result = ( base_value + offset )*( rate )*( multiplier )

    return Math.round(result * 10) / 10
}

export const mod_parameter_operation = (mod_parameter_string: string, parameter: number) => {
    const regex = /(?<sign>[+-])?(?<value>(\d+|ND|MD|HP))?(?<porcentage>\s*%)?(?<max>\s*max)?/gm
    const match = regex.exec(mod_parameter_string);
    const sign = match?.groups?.sign;
    const max = match?.groups?.max;
    const value = match?.groups?.value;
    const porcentage = match?.groups?.porcentage;

    if(!value) return parameter

    let result = parameter;

    if(porcentage && sign === '+'){
            result += result * (parseInt(value) / 100);
    }else if(porcentage && sign === '-'){
            result -= result * (parseInt(value) / 100);
    }else if(sign === '+'){
            result += parseInt(value);
    }else if(sign === '-'){
            result -= parseInt(value);
    }

    return result;
}

export class UnitParameters{
    public vitality: number = 0;
    public strength: number = 0;
    public dexterity: number = 0;
    public mind: number = 0;
    public faith: number = 0;
    public essence: number = 0;
    public agility: number = 0;
    public hit_chance: number = 0;
    public evasion: number = 0;

    public physical_damage: number = 0;
    public magical_damage: number = 0;

    public armor: number = 0;
    public magic_armor: number = 0;

    public hit_rate: number = 0;
    public movement: number = 0;

    public shield: number = 0;

    public weight: number = 0;
    

    constructor(unit: any){
        this.vitality =  value_multiplier( unit.base_vitality, unit.specialization.vitality, 10 );

        this.strength = value_multiplier( unit.base_strength, unit.specialization.strength, 5 );
        this.dexterity = value_multiplier( unit.base_dexterity, unit.specialization.dexterity, 5 );
        this.mind = value_multiplier( unit.base_mind, unit.specialization.mind, 5 );
        this.faith = value_multiplier( unit.base_faith, unit.specialization.faith, 5 );

        this.essence = value_multiplier( unit.base_essence, unit.specialization.essence, 10 );
        this.agility = value_multiplier( unit.base_agility, unit.specialization.agility, 5 );
        this.hit_chance = value_multiplier( unit.base_hit_chance, unit.specialization.hit_chance, 5 );
        this.evasion = value_multiplier( unit.base_evasion, unit.specialization.evasion, 5 );

        this.hit_rate = unit.specialization.hit_rate
        this.movement = unit.specialization.movement

        // Main stats Bonuses
        this.vitality += this.faith;
        this.essence += this.mind;
        this.hit_chance += this.dexterity/2;
        this.evasion += this.dexterity/2;

        // Damage
        this.physical_damage = this.strength + this.dexterity;
        this.magical_damage = this.mind + this.faith;

        // From items
        this.vitality += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.vitality, acc), 0);
        this.strength += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.strength, acc), 0);
        this.dexterity += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.dexterity, acc), 0);
        this.mind += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.mind, acc), 0);
        this.faith += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.faith, acc), 0);
        this.essence += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.essence, acc), 0);
        this.hit_chance += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.hit_chance, acc), 0);
        this.evasion += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.evasion, acc), 0);
        this.physical_damage += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.physical_damage, acc), 0);
        this.magical_damage += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.magical_damage, acc), 0);
        this.armor += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.armor, acc), 0);
        this.magic_armor += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.magic_armor, acc), 0);

        this.shield += unit.items.reduce((acc: number, item: any) => mod_parameter_operation(item.item.shield, acc), 0);

        this.weight += unit.items.reduce((acc: number, item: any) => parseInt(item.item.weight) + acc, 0);

        // From Traits
        this.vitality += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.vitality, acc), 0) + acc, 0);
        this.strength += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.strength, acc), 0) + acc, 0);
        this.dexterity += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.dexterity, acc), 0) + acc, 0);
        this.mind += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.mind, acc), 0) + acc, 0);
        this.faith += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.faith, acc), 0) + acc, 0);
        this.essence += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.essence, acc), 0) + acc, 0);
        this.hit_chance += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.hit_chance, acc), 0) + acc, 0);
        this.evasion += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.evasion, acc), 0) + acc, 0);
        this.physical_damage += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.physical_damage, acc), 0) + acc, 0);
        this.magical_damage += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.magical_damage, acc), 0) + acc, 0);
        this.armor += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.armor, acc), 0) + acc, 0);
        this.magic_armor += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.magic_armor, acc), 0) + acc, 0);

        this.shield += unit.faction.traits.reduce((acc: number, trait: any) => trait.trait.effects.reduce((acc: number, effect: any) => mod_parameter_operation(effect.effect.shield, acc), 0) + acc, 0);        

        // Rounding
        this.vitality = Math.round(this.vitality*10)/10;
        this.essence = Math.round(this.essence*10)/10;
        this.hit_chance = Math.round(this.hit_chance*10)/10;
        this.evasion = Math.round(this.evasion*10)/10;
        this.physical_damage = Math.round(this.physical_damage*10)/10;
        this.magical_damage = Math.round(this.magical_damage*10)/10;
    }

}