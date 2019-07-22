import React from 'react'

const FilterCategory = ({ onFilterCategory }) => {
    return (
        <div className="FilterSeason mb-4">
            <h6>Filter category</h6>
            <div className="btn-group" role="group">
                {[null, "cars", "planes", "boats"].map(category => (
                    <button
                        className="btn btn-secondary"
                        key={category}
                        onClick={() => { onFilterCategory(category) }}>

                        {category ? `${category}` : 'Todas'}

                    </button>
                ))}
            </div>
        </div>
    )
}

export default FilterCategory