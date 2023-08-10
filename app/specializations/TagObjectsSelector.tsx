import React, { useEffect, useState } from 'react'
import ObjectTypeSelection from './ObjectTypeSelection';

export interface OjbectOptionType{
    label: string;
    value: string;
    realValue: string;
}

interface TagObjectsSelectorProps {
    objectTypeOptionsSelected: OjbectOptionType[];
    objectTypeOptions: OjbectOptionType[];
    updateObjectsOutput: any;
    style?: string;
}

function ObjectTypeSelectedList({removeObjectType,selectedObjectTypes, styles}: {removeObjectType: any, selectedObjectTypes: OjbectOptionType[], styles?:string}) {

    function RemoveObjectType(selectedEvent: OjbectOptionType){
        removeObjectType(selectedEvent);
    }

    return (
      <div className={`${styles}`}>
        {selectedObjectTypes.map((object: any) => (
          <div key={object.label} className="border-2 border-yellow-500/50 rounded-xl w-18 h-18 p-1 bg-opacity-50 bg-black">
            <div className='flex flex-col items-end' onClick={()=>RemoveObjectType(object)}>
              <button className='text-xs'>
                x
              </button>
            </div>
            <span className="block font-light text-xs text-yellow-200/70 ">
              {object.value}
            </span>
          </div>
        ))}
      </div>
    )
}

function TagObjectsSelector({objectTypeOptionsSelected, objectTypeOptions, updateObjectsOutput, style}: TagObjectsSelectorProps) {
    let [objectTypesSelected, setObjectTypesSelected] = useState<OjbectOptionType[]>([]);
    let [objectTypesRemaining, setObjectTypesRemaining] = useState<OjbectOptionType[]>(objectTypeOptions);
    //let [objectsOutput, setObjectsOutput] = useState<string>("");

    // When the component is mounted, we need to update the object types selected and remaining
    // according to the "selected" initial values
    useEffect(() => {
        setObjectTypesSelected(objectTypeOptionsSelected);
        setObjectTypesRemaining(objectTypeOptions.filter((item) => !objectTypeOptionsSelected.includes(item)));
    }, []);


    function handleObjectTypeAdded(selectedObjectType: OjbectOptionType) {
        // Remove the selected object type from the remaining options
        setObjectTypesRemaining(
            objectTypesRemaining.filter((item) => item.realValue !== selectedObjectType.realValue)
        );
        
        // Keep track of the selected object types
        let objectTypesSelectedBuffer = [...objectTypesSelected,selectedObjectType]
        setObjectTypesSelected(
            objectTypesSelectedBuffer
        );

        // Generate the weapon proficiencies string 
        // Since the selected object types are not updated yet (done in the lines above, but state is async), we cannot use the objectTypesSelected variable.
        updateObjectsOutput(
            objectTypesSelectedBuffer.map((item) => item.realValue).join('|')
        );
    }

    function handleObjectTypeRemoved(selectedObjectType: OjbectOptionType) {
        // Remove the object type from the selected options
        let objectTypesSelectedBuffer =  objectTypesSelected.filter((item) => item.realValue !== selectedObjectType.realValue)
        setObjectTypesSelected(
          objectTypesSelectedBuffer
        );

        // Keep track of the remaining object types
        setObjectTypesRemaining(
            [
              ...objectTypesRemaining,
              selectedObjectType
            ]
        );

        // Generate the weapon proficiencies string
        // Since the selected object types are not updated yet (done in the lines above, but state is async), we cannot use the objectTypesSelected variable.
        updateObjectsOutput(
            objectTypesSelectedBuffer.map((item) => item.realValue).join('|')
        );
    }

    return (
        <div>
            <ObjectTypeSelectedList removeObjectType={handleObjectTypeRemoved} selectedObjectTypes={objectTypesSelected} styles={`w-full ${style}`} />
            <ObjectTypeSelection addObjectType={handleObjectTypeAdded} objectTypes={objectTypesRemaining} selectedObjectTypes={objectTypesSelected} />
        </div>
    )
}

export default TagObjectsSelector