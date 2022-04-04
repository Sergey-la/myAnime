import React, { Component }  from 'react';

import './Search.scss';

import searchImg from '../../assets/images/search.svg';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            search: ''
        };
    }

    onChecked = () => {
        this.setState(({ checked }) => ({
            checked: !checked,
        }));
    };

    onUpdateSearch = (e) => {
        const search = e.target.value;
        this.setState({search: search});
        this.props.onUpdateSearch(search);
    }

    render() {
        const {checked, search} = this.state;
        return (
            <div className="Search">
                <label
                    className={
                        checked ? 'Search-box _checked' : 'Search-box'
                    }
                >
                    <button onClick={this.onChecked}>
                        <img
                            src={searchImg}
                            alt="поиск"
                            width={30}
                            height={30}
                        />
                    </button>
                    <input type="text" placeholder="Поиск" value={search} onChange={this.onUpdateSearch}/>
                </label>
            </div>
        );
    }
}

export default Search;
