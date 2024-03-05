

const Filter = ({value, onChange}) => {
    return (
        <p>
            find countries <input placeholder="Search country..." value ={value} onChange={onChange} />
        </p>
    )
  }
  

  export default Filter