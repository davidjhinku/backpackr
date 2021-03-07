import React from 'react';

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.clearSearch = this.clearSearch.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props) {

        const options = {
            // Only get back specific type of result
            types: ['address'],
        };

        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );

        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        //Clear search input
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    //When location changes
    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry){
            return null
        } ;

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(19);
        }

        addplace(place);
        this.searchInput.blur();
    };

    clearSearch() {
        this.searchInput.value = "";
    }

    render() {
        return (
            <div className="map-search-form">
                <input
                    type="text"
                    className="map-search-input"
                    placeholder="Where to next?"
                    
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    
                    onFocus={this.clearSearch}
                />
            </div>
        );
    }
}

export default AutoComplete;