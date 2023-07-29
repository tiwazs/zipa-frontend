import React from 'react'

interface EffectOptionProps {
    id: string;
    name: string;
    description: string;
    magic_effectiveness: string;
    physical_damage: string;
    magical_damage: string;
    healing: string;
    vitality_recovery: string;
    essence_recovery: string;
    vitality: string;
    range: string;
    damage: string;
    armor: string;
    magic_armor: string;
    essence: string;
    agility: string;
    hit_chance: string;
    evasion: string;
    hit_rate: string;
    movement: string;
    ammo: string;
    shield: string;
    barrier: number;
    max_stack: number;
    styles: string;
}

export default function EffectOption(effect: EffectOptionProps) {
    return (
    <div className={`${effect.styles}`}>
        
        <h3 className='font-bold my-2'>{effect.name}</h3>
        <p className='my-1 text-gray-100 '>{effect.description}</p>
        <div className='flex font-extralight italic '>
            { (effect.magic_effectiveness && effect.magic_effectiveness !== "0") && <p>,{effect.magic_effectiveness} Magic Power   </p>}
            { (effect.physical_damage && effect.physical_damage !== "0") && <p>,{effect.physical_damage} Physical Damage   </p>}
            { (effect.magical_damage && effect.magical_damage !== "0") && <p>,{effect.magical_damage} Magic Damage   </p>}
            { (effect.healing && effect.healing !== "0") && <p>,{effect.healing} Healing   </p>}
            { (effect.vitality_recovery && effect.vitality_recovery !== "0") && <p>R,ecovers {effect.vitality_recovery} Vitality   </p>}
            { (effect.essence_recovery && effect.essence_recovery !== "0") && <p>R,ecovers {effect.essence_recovery} Essence   </p>}
            { (effect.vitality && effect.vitality !== "0") && <p>,{effect.vitality} Max Vitality   </p>}
            { (effect.range && effect.range !== "0") && <p>,{effect.range} Range   </p>}
            { (effect.damage && effect.damage !== "0") && <p>,{effect.damage} All Damage   </p>}
            { (effect.armor && effect.armor !== "0") && <p>,{effect.armor} Armor   </p>}
            { (effect.magic_armor && effect.magic_armor !== "0") && <p>,{effect.magic_armor} Magic Armor   </p>}
            { (effect.essence && effect.essence !== "0") && <p>,{effect.essence} Max Essence   </p>}
            { (effect.agility && effect.agility !== "0") && <p>,{effect.agility} Agility   </p>}
            { (effect.hit_chance && effect.hit_chance !== "0") && <p>,{effect.hit_chance} Hit Chance   </p>}
            { (effect.evasion && effect.evasion !== "0") && <p>,{effect.evasion} Evasion   </p>}
            { (effect.hit_rate && effect.hit_rate !== "0") && <p>,{effect.hit_rate} Hit Rate   </p>}
            { (effect.movement && effect.movement !== "0") && <p>,{effect.movement} Movement   </p>}
            { (effect.ammo && effect.ammo !== "0") && <p>,{effect.ammo} Ammo   </p>}
            { (effect.shield && effect.shield !== "0") && <p>,{effect.shield} Shield   </p>}
            { (effect.barrier || effect.barrier !== 0) && <p>{effect.barrier} Barrier   </p>}
            { (effect.max_stack || effect.barrier !== 0) && <p>{effect.max_stack} Stacks   </p>}
        </div>
        
    </div>
    )
}
