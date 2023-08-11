import { paint_modifier } from "../_libs/text_paint_methods";

export default function DisplayValue({previous_text, value, after_text, style}:{previous_text?: string, value: string | number | undefined, after_text?: string, style?: string}) {   
    return (
        <>
         {(typeof value !== "number") ? (value && value !== "0") && <p>{previous_text}<span className={` font-light ${paint_modifier(value)}`}>{value}</span>{after_text}</p>
         : (typeof value === "number") ? (value !== 0) && <p>{previous_text}<span>{value.toString()}</span>{after_text}</p>
         : null}
        </>
    )
}