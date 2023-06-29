/**
 * Renders select and label elements
 * @param {string} id - id to link label and select elements 
 * @param {string} label - content for the label 
 * @param {string[]} option - string content for the option elements 
 * @param {function} onChange - function to handle onChange event 
 */
export default function Select({id, label, options, onChange}) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select id={id} onChange={onChange}>
                <option value="">Selecione uma opção</option>
                {options.map(value => (
                    <option value={value} key={value}>{value}</option>
                ))}
            </select>
        </>
    )
}