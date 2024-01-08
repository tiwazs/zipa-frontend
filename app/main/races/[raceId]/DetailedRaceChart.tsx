import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import RaceTraitCard from './RaceTraitCard';
import NewRaceOptionDialog from './NewRaceOptionDialog';
import NewOptionDialog from '@/app/_components/NewOptionDialog';
import SimpleReducedCard from '@/app/_components/InformationCards/SimpleReducedCard';
import OptionSelection from '@/app/_components/OptionSelection';
import { paintTier, writeTier } from '@/app/_libs/text_paint_methods';
//import RaceUnitsDisclosure from './RaceUnitsDisclosure';

interface Race {
    id: string;
    race_group_id: string;
    name: string;
    description: string;
    identity: string;
    aspects: string;
    unit_specializations?: string[];
    traits?: string[];
    available_cultures?: string[];
    available_beliefs?: string[];
}

type DetailedRaceChartProps = {
    race: Race;
    styles?: string;
}
///
const getUnitSpecializations = async (endpoint: string, ownerId: string | undefined) => {
    if(!ownerId){
        return [];
    }

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}${ownerId}`, {
            method: 'GET',
        });
        console.log(`Response: ${JSON.stringify(response)}`);


        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function DetailedRaceChart({race, styles}: DetailedRaceChartProps) {
    const [ editing, setEditing ] = useState(false);
    const [ cultureSelected, setCultureSelected ] = useState({id: undefined, name: undefined});
    const [ beliefSelected, setBeliefSelected ] = useState({id: undefined, name: undefined});
    const [ specializationList, setSpecializationsList ] = useState<any>(undefined);
    //let [ cultureSpecsOrganized, setCultureSpecsOrganized ] = useState<any>(undefined);
    //let [ beliefSpecsOrganized, setBeliefSpecsOrganized ] = useState<any>(undefined);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Race>();
    const query_spec_cultures = useQuery([`cultureSpecializations`, cultureSelected.id], () => getUnitSpecializations("/specializations/culture/", cultureSelected.id) );
    const query_spec_beliefs = useQuery([`beliefSpecializations`, beliefSelected.id], () => getUnitSpecializations("/specializations/belief/", beliefSelected.id) );
    const queryClient = useQueryClient();

    useEffect(() => {
        let newList = [
            {title: 1, information: {}},
            {title: 2, information: {}},
            {title: 3, information: {}},
            {title: 4, information: {}},
            {title: 5, information: {}},
        ];
    
        if(query_spec_cultures.data){
            newList = organizeSpecializations(newList, query_spec_cultures.data, "cultures");
        }
        if(query_spec_beliefs.data){
            newList = organizeSpecializations(newList, query_spec_beliefs.data, "beliefs");
        }
        
        // Calling useState only one time to avoid multiple re-renders and because of useState's async nature
        setSpecializationsList(newList);
    }, [query_spec_cultures.data, query_spec_beliefs.data])

    const handleCultureChange = (selection: any) => {
        setCultureSelected(selection);
        
        queryClient.invalidateQueries(`cultureSpecializations`);
    }        

    const handleBeliefChange = (selection: any) => {
        setBeliefSelected(selection);

        queryClient.invalidateQueries(`beliefSpecializations`);
    }

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Race> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/races/${race.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`race`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }

    //return  [
    //    {title: 1, information: {group:tier_i_list}},
    //    {title: 2, information: {group:tier_ii_list}},
    //    {title: 3, information: {group:tier_iii_list}},
    //    {title: 4, information: {group:tier_iv_list}},
    //    {title: 5, information: {group:tier_v_list}},
    //]

    const organizeSpecializations = (data: any, new_data: any, group: string) => {
        if(!new_data){
            return data;
        }
        let tier_i_list = new_data.filter( (unit: any) => unit.tier === 1 );
        let tier_ii_list = new_data.filter( (unit: any) => unit.tier === 2 );
        let tier_iii_list = new_data.filter( (unit: any) => unit.tier === 3 );
        let tier_iv_list = new_data.filter( (unit: any) => unit.tier === 4 );
        let tier_v_list = new_data.filter( (unit: any) => unit.tier === 5 );
        data[0]['information'][group] = tier_i_list;
        data[1]['information'][group] = tier_ii_list;
        data[2]['information'][group] = tier_iii_list;
        data[3]['information'][group] = tier_iv_list;
        data[4]['information'][group] = tier_v_list;

        return data;
    }

    return (
        <div className="transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all 
                                  border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
            <h2 className={`mb-3 text-xl font-medium`}>
              Detailed Information{' '}
            </h2>
            <form className='rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
                <div className='mx-2 lg:grid lg:grid-cols-4'>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Race Group Id</h1>
                        <input 
                            {...register("race_group_id", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="race_group_id"
                            disabled={!editing}
                            placeholder={ race.race_group_id ? race.race_group_id : "Race Group Id" }
                        />                                
                    </div>

                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ race.description ? race.description : "Description" }
                        />                                
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Identity</h1>
                        <textarea 
                            {...register("identity", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="identity"
                            disabled={!editing}
                            placeholder={ race.identity ? race.identity : "Identity" }
                        />                                
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Aspects</h1>
                        <textarea 
                            {...register("aspects", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="aspects"
                            disabled={!editing}
                            placeholder={ race.aspects ? race.aspects : "Aspects" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Race Traits</h1>
                            {editing && <NewRaceOptionDialog raceId={race.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md'
                                title={'Add Traits'}
                                description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                                selection={'traits'}/>}
                        </div>
                        {(race.traits && race.traits.length > 0) ? race.traits.map((trait: any) => {
                            return <RaceTraitCard key={trait.trait.id} racetrait={trait} raceId={race.id} editable={editing} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                </div>
                <div className='flex justify-between px-10'>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Available Cultures</h1>
                            {editing && <NewOptionDialog raceId={race.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md'
                                title={'Add Cultures'}
                                description={'Cultures.'} 
                                selection_endpoint={`/cultures/`}
                                queryKey={'cultures'}
                                invalidateKey={'race'}
                                add_endpoint={`/races/add_culture/${race.id}?culture_id=`} />
                                }
                        </div>
                        <div className='flex space-x-2'>
                            {(race.available_cultures && race.available_cultures.length > 0) ? race.available_cultures.map((culture: any) => {
                                return <SimpleReducedCard key={culture.culture.id} object_info={culture.culture} object_query_key={'race'} redirect_endpoint={`/main/cultures/`} icon_endpoint={''} remove_endpoint={`/races/remove_culture/${race.id}?culture_id=`} editable={editing} />
                            }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                        </div>
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Available Beliefs</h1>
                            {editing && <NewOptionDialog raceId={race.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md'
                                title={'Add Beliefs'}
                                description={'Beliefs.'} 
                                selection_endpoint={`/beliefs/`}
                                queryKey={'beliefs'}
                                invalidateKey={'race'}
                                add_endpoint={`/races/add_belief/${race.id}?belief_id=`} />
                                }
                        </div>
                        <div className='flex space-x-2'>
                            {(race.available_beliefs && race.available_beliefs.length > 0) ? race.available_beliefs.map((belief: any) => {
                                return <SimpleReducedCard key={belief.belief.id} object_info={belief.belief} object_query_key={'race'} redirect_endpoint={`/main/beliefs/`} icon_endpoint={''} remove_endpoint={`/races/remove_belief/${race.id}?belief_id=`} editable={editing} />
                            }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                        onClick={onCancel}
                        >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                    {editing && <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                      cursor-pointer'>
                        <input type="submit" value="Save" className='text-gray-400 text-sm cursor-pointer'/>
                    </div>}
                </div>
            </form>
            <div className='flex items-center justify-evenly '>
                <OptionSelection endpoint={`/cultures/?by_race_id=${race.id}&include_traits=true&include_units=true`} queryKey='culture' onSelectionChange={handleCultureChange} style='z-30' />
                <OptionSelection endpoint={`/beliefs/?by_race_id=${race.id}&include_traits=true&include_units=true`} queryKey='belief' onSelectionChange={handleBeliefChange} style='z-30' />
            </div>
            <div className={`${specializationList ? "" : "h-40"}`} >
                {specializationList && specializationList.map((specs_tier: any) => {
                    return (
                        <div key={specs_tier.title} className='flex flex-col items-center my-5'>
                            <span className={`text-2xl font-extrabold  divide-y font-serif ${(typeof(specs_tier.title) === "number") ? paintTier(specs_tier.title) : specs_tier.title}`}>
                                {(typeof(specs_tier.title) === "number") ? writeTier(specs_tier.title) : specs_tier.title}
                            </span>
                            <hr className='w-20 border-yellow-500/50 ' />
                            <div className='w-full flex items-center justify-evenly my-5'>
                                <div className='flex space-x-2'>
                                    {(specs_tier.information.cultures && specs_tier.information.cultures.length > 0) ? specs_tier.information.cultures.map((spec: any) => {
                                        return <SimpleReducedCard key={spec.id} object_info={spec} object_query_key={'Specialization'} redirect_endpoint={`/main/specializations/`} icon_endpoint={''} remove_endpoint={``} editable={editing} />
                                    }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                                </div>
                                <div className='flex space-x-2'>
                                    {(specs_tier.information.beliefs && specs_tier.information.beliefs.length > 0) ? specs_tier.information.beliefs.map((spec: any) => {
                                        return <SimpleReducedCard key={spec.id} object_info={spec} object_query_key={'Specialization'} redirect_endpoint={`/main/specializations/`} icon_endpoint={''} remove_endpoint={``} editable={editing} />
                                    }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
