const Filter = ({value, onChange}) => {
    return (
        <div>
            filter shown with: <input onChange={onChange} value ={value}/><br/><br/>
        </div>
    )
  }

  export default Filter