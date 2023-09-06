'use client'

import React, { Suspense } from 'react'
import InformationOption from '../../_components/InformationOption'

export default function ItemsPage() {    
    return (
    <main className="items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                General{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
           before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
           after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
           before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        </div>
        <div className='text-gray-300'>
        <InformationOption style='w-full border-4' innerStyle='flex space-y-10'>
            <InformationOption title='ZIPA' style='w-full border-1'>
                Zipa is a grand campaign game combining elements of strategy, rpg and roguelike games.
            </InformationOption>
            <InformationOption title='' style='w-full'>
                <p>there are three components to the game, the campaign map and city management, exploration as a unit or in a group, and the battles which may be
                small skirmishes or large scale battles with other faction that you may encounter.</p>
                <p>Select a faction or culture and colonize a region of the map and start your journey. Your settlements will grow and you will 
                be able to construct new buildings. assign workers to gather resources, train in craftmanship, or even train in the arts of war.
                Before starting any construction consider the terrain, the resources available, and the buildings you already have, since some buildings
                may require others to be built first.
                Grow your city and expand your territory, but be careful, since the more you expand the more you will have to defend, and the more
                resources you will need to gather to keep your city running.</p>
                <p>In this world nothing is static, the map is ever changing, factions rise and fall, and the world is in constant change.</p>
                <p>Only when you have colonized a region it will not change, otherwise once you leave and the fog of war covers a place it will change.</p>
                <p>Sometimes you will find ruins, or other settlements, or even other factions, and you may interact with them, trade, fight, or even
                  join them.</p>
                <p>With so much uncertainty, you will have to be prepared for anything, and be ready to adapt to any situation.</p>
                <p>explore as a single unit or as a small group, and in times of war, fight battles against other factions.</p>
                <p>You can explore your settlement and talk to the inhabitants, workers, farmers, smiths, priests etc.</p>
                <p>you can also explore the region around your settlement, and find resources, ruins, other settlements, and other factions.</p>
                <p>you can also explore the world map, and find other regions, other factions, and other cultures.</p>
                <p>But first you should recruit some units, and train them, and equip them with weapons and armor.</p>
                <p>Each unit is a citizen of your settlement, it has a name, and a profession, and a family, and a home. If a unit dies, it will be gone forever.</p>
                <p>Each unit has a set of base stats. some are better at fighting, others with magic, others at crafting, others at gathering, etc.
                  so before recruiting a unit, consider what you need and their skills.</p>
                <p>Then, once you have considered you can order them to pass a Specialization training which will grant them a set of skills and will be recruitable as a 
                  specialized unit.</p>
                <p>Once you have recruited some units, you can equip them with weapons and armor, and train them in the barracks.</p>
            </InformationOption>
            <InformationOption title='FACTIONS' style='w-full'>
                <p>Each army is composed of units, each unit has a set of stats, traits, skills and items that define it.</p>
                <p>Gather a group of units and explore the world, find resources, ruins, other settlements, and other factions.</p>
            </InformationOption>
            <InformationOption title='UNITS' style='w-full'>
                <p>Before sending a unit to a Specialization training, consider what you need and their skills and base stats. List of factions and Specializatioins</p>
                <p>Each army has 5 tiers of units, these are,
                  from tier 1 to 4 units in each tier are stronger
                  than the previous but are also more
                  expensive. Some units have stronger versions on higher tiers, 
                  but this is not always the case, and even low tier units can have
                  some useful abilities that could help a lot that other higher tier units do not.</p>
                <p>The fifth tier is the Commander, The one who leads the army into battle, and are the most powerful units.
                  Each army can have only one commander, since they are the ones who lead the army.</p>
                <p>Unit Stats</p>
                <p>VITALITY (VIT): Hit points a unit has. damage reduces it until it reaches 0 where there is a 66% change of death.</p>
                <p>STRENGTH (STR): How strong a unit is. determines how much weight a unit carries and part of the total physical damage.</p>
                <p>DEXTERITY (DEX): How skilled a unit is, increases evasion and hit chance values and part of the total physical damage.</p>
                <p>MIND (MIN): How quick minded a unit is, how versed in the magical arts, increases essence value and part of the total magical damage.</p>
                <p>FAITH (FAI): How devoted or conected to the gods a unit is, increases the vitality value and part of the total magical damage.</p>
                <p>ARMOR (ARM): Indicates a grade of physical damage reduction, each point reduces physical damage by 5%. Units have no armor by deafult but get armor by wearing armor (and sometimes other means like traits, skills or effects)</p>
                <p>MAGIC ARMOR (MAR): Indicates a grade of magical damage reduction, each point reduces magical damage by 5%. Units have no magical armor by deafult but get magical armor by wearing enchanted armor (and sometimes other means like traits, skills or effects)</p>
                <p>ESSENCE (ESS): Main energy resouce for magic.</p>
                <p>AGILITY (AGI): Indicates how quick a unit can act. units with higher agility can act first</p>
                <p>HIT CHANCE (HIT): Indicates the probability to land a hit on an enemy. when this unit attacks this value is taken against enemy's evasion.</p>
                <p>EVASION (EVA): Indicates the probability to avoid a hit partially or fully. when this unit is attacked this value is taken against enemy's hit chance.</p>
                <p>HIT RATE (HIR): How many times a unit attacks. the damage each attack however is divided between the number of attacks</p>
                <p>MOVEMENT (MOV): How many Mts a unit can move</p>
                <p>PHYSICAL DAMAGE (PDG): Total physical damage a unit deals. Mainly is the sum of STR+DEX, adding the bonuses from wepons, traits, skills or effects</p>
                <p>MAGIC DAMAGE (MDG): Total magical damage a unit deals. Mainly is the sum of MIN+FAI, adding the bonuses from wepons, traits, skills or effects</p>
                <p>RANGE (RAN): The range from where a unit can attack. is determined by the weapon but modified by skills.</p>
                <p>Other Parameters</p>
                <p>SHIELD (SHL): Indicates a direct probablity to reduce damage from projectiles (Physical and Magical attacks) by 50%</p>
                <p>TIER:</p>
                <p>Weapon Proficiencies: Which weapons a unit can equip</p>
                <p>Traits: Traits a unit has. these give permanent effects. can modify stats, grant effects on conditions, deal damage etc.</p>
                <p>Skills: Abilities a unit can use.</p>
                <p>Items: Items a unit can equip. from these a unit can have: 1 Armor, 1 2handed Weapon or 2 one handed weapons, and 3 extra items, 
                  which can be another 1 handed weapon as secondary weapon, consunables like potions etc, or ammulet or trinkets. keep in mind items have weight that sums and may overwhelm your STR </p>
            </InformationOption>
            <InformationOption title='COMBAT' style='w-full'>
                <p>Before combat, each side may position their units (Unless it's an ambush)</p>
                <p>Combat is turn based. Each turn, every unit can make 2 actions, which can be either a normal action or an attack. however, each turn
                  a unit can attack only as many times as its hit Rate indicates (HIR). so for example, if a unit has a HIR of 1, it can attack only 
                  once and do a normal action, or just do 2 normal actions. if a unit has a HIR of 2, it can attack twice and do a normal action, or do 2
                  normal actions and attack once, or do 3 normal actions.</p>
                <p>a normal action could be to move, use a non damaging ability, use an item, etc.</p>
                <p>Before any other unit, commaners can use their priority moves to act first
                  otherwise the one with the most Agility (AGI) will move first.</p>
                <p>Orders can be given to individual units or to groups of units.</p>
                <p>If a set of units of the same tipe are in formation, you can give orders to the whole formation through the squad captain</p>
            </InformationOption>
            <InformationOption title='ACTIONS AND DAMAGE' style='w-full'>
                <p>There are 2 type of actions, normal actions and damaging actions (attacks).</p>
                <p>Normal actions can be used to move, use an item, use a non damaging ability, etc.</p>
                <p>Attacks can be used to attack an enemy unit. there are 2 types of attacks, physical and magical.</p>
                <p>Attacks can be melee or ranged. melee attacks can only be used when the enemy is adjacent to the unit, and ranged attacks
                  can be used when the enemy is within range.</p>
                <p>Physical attacks deal physical damage, and are affected by the enemy's armor (ARM) and shield (SHL).</p>
                <p>shield (SHL) is a direct probability to completly avoid ranged attacks (Physical and Magical)</p>
                <p>Magical attacks deal magical damage, and are affected by the enemy's magical armor (MAR).</p>
                <div className='my-2'>
                    <h3 className={`font-bold text-yellow-200/70`}>Attacks</h3>
                </div>
                <p>Before an attack is made, the attacker's hit chance (HIT) is compared to the enemy's evasion (EVA) to determine if the attack lands 
                  directly, critically, if its deflected, or misses.</p>
                <p>if the attack lands, the attack power is calculated.</p>
                <p>When an attack is made, the it power is calculated by the attacker's Damage, be it physical or magical,
                  having into account the weapon's power, and modifications from traits, skills or effects, and finally 
                  modified by the skill power in case the attack is made with a skill.</p>
                <p>Then the attack power is compared to the enemy's armor (ARM or MAR) and shield, (SHL) in case of ranged attacks, to determine the damage.</p>
                <p>armor and magical armor reduce the damage by 5% per point, and shield is a direct probability to completly avoid ranged attacks (Physical and Magical)</p>
                <p>and finally the damage is applied to the enemy's vitality (VIT)</p>
                <p>if the attack is a critical hit, the damage is increased by 80%.</p>
                <p>if the attack is deflected, the damage is reduced by 50%.</p>
                <p>if the attack is a miss, the damage is reduced by 100%.</p>
                <div className='my-2'>
                    <h3 className={`font-bold text-yellow-200/70`}>Other combat rules</h3>
                </div>
                <p>When a caster/sorcerer unit faces an enemy directly, (no units between them), gains critical mass, which
                  increases the damage done 20%.</p>
                <p>Position Damage Bonus. When a unit attacks another unit from behind gets a +15% damage bonus and from attacking
                    the flanks gets a +7% damage bonus.</p>
                <p>Units may carry more than one weapon, and may switch between them. switching weapons takes 1 action</p>
            </InformationOption>

            <InformationOption title='ITEMS' style='w-full'>
                <p>Items are objects that can be equipped by units. there are 4 types of items, Armor, Weapons, Trinkets and Consumables.</p>
                <p>Each item has a weight, and a unit can only carry a certain amount of weight, based on their strength. 
                  if the weight is exceeded, the unit will be overburdened and will suffer a penalty to its stats.</p>
                <p>Armor: Armor is used to protect the unit from physical or magical damage. increases armor magic armor, vitality and sometimes other stats.</p>
                <p>Weapons: Weapons are used to attack. determine the unit range, increase damage and sometimes other stats.
                  there are 3 types of weapons, melee, ranged and shields. 
                  melee weapons can only be used when the enemy is adjacent to the unit. they can be one handed or two handed.
                  shields are used to block ranged attacks, and can only be paired with one handed weapons.
                  ranged weapons can be used when the enemy is within range. they usually require dexterity to use and consume ammo.
                </p>
                <p>Trinkets: Trinkets are used to increase stats, or grant effects. they can be amulets, rings, etc. these are permanent</p>
                <p>Consumables: Consumables are used to heal, cure, or grant effects. they can be potions, scrolls, etc. however 
                  they are not permanent and should be replenished</p>
            </InformationOption>
        </InformationOption>
        </div>
    </main>
    )
}
