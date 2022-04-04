import { Component } from 'react';

import MainListItem from '../MainListItem/MainListItem';
import './MainList.scss';
import emptyList from '../../assets/images/empty-list.png';

class MainList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { data, onDelete, onAddComplet, onDeleteComplet, onAddFav, onDeleteFav } = this.props;
        
        if (data.length === 0) {
            return (
                <div className="Main-list">
                    <h2>Мои аниме</h2>
                    <div className="Main-list__mes">
                        <img src={emptyList} alt="пустой список" width={350} height={350}/>
                    </div>
                </div>
            );
        }
        const elements = data.map((item) => {
            const { id, ...itemProps } = item;

            return (
                <MainListItem
                    key={id}
                    {...itemProps}
                    onDelete={() => onDelete(id, itemProps.name)}
                    onAddComplet={() => onAddComplet(id)}
                    onDeleteComplet={() => onDeleteComplet(id)}
                    onAddFav={() => onAddFav(id)}
                    onDeleteFav={() => onDeleteFav(id)}
                />
            );
        });

        return (
            <div className="Main-list">
                <h2>Мои аниме</h2>
                <ul>{elements}</ul>
            </div>
        );
    }
}

export default MainList;
