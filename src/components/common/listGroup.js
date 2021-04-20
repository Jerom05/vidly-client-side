import React from 'react'

const ListGroup = (props)=>{
    const {items, onItemSelect, textProperty, valueProperty, selectedItem} = props
    return (
        <ul className='list-group' style={{}}>
            {items.map(item=>(
                
                <li key={item[valueProperty] || item[textProperty]} 
                    className= {item === selectedItem ? 'list-group-item active': 'list-group-item'}
                    onClick={()=>onItemSelect(item)}>
                      {item[textProperty]}
                </li>
            ))}
        </ul>
    )

}
ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};
  

export default ListGroup
