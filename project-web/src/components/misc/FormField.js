import React from 'react'

const FormField = (props) => {
    const {
        label,
        name,
        onBlur,
        value,
        onChange,
        touch,
        error,
        inputType,
        validationClassName
    } = props

    const inputAttrs = {
        autoComplete: "off",
        className: `form-control ${validationClassName}`,
        name,
        value,
        onBlur,
        onChange: onChange
    }

    return(
        <div className = "form-group">
            <label>{label}</label>

            {inputType === 'textarea'
            ? <textarea { ...inputAttrs } rows = {7}></textarea>
            : <input {...inputAttrs}/>}
        {touch && !error && (
        <div className="valid-feedback">
          Looks good!
        </div>
      )}

      {touch && error && (
        <div className="invalid-feedback">
          Invalid field
        </div>
      )}
    </div>
  )
}

export default FormField

