import React from 'react'

const FilterCategory = ({ onFilterCategory }) => {
    return (
        <div className="FilterSeason mb-4">
            <h6>Filter category</h6>
            <div className="btn-group" role="group">
                {[null, 1, 2, 3, 4, 5, 6, 7, 8].map(category => (
                    <button
                        className="btn btn-secondary"
                        key={category}
                        onClick={() => { onFilterCategory(category) }}>

                        {category ? `S0${category}` : 'Todas'}

                    </button>
                ))}
            </div>
        </div>
    )
}

export default FilterCategory