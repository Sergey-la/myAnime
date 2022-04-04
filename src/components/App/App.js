import { Component } from 'react';

import Header from '../Header/Header';
import MainList from '../MainList/MainList';
import Search from '../Search/Search';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: !localStorage.data
                ? []
                : JSON.parse(localStorage.getItem('data')),
            dataList: !localStorage.dataList
                ? [
                      {
                          name: 'Всего в списке',
                          sum: 0,
                          id: 1,
                      },
                      { name: 'Просмотрено', sum: 0, id: 2 },
                      { name: 'В избранном', sum: 0, id: 3 },
                  ]
                : JSON.parse(localStorage.getItem('dataList')),
            search: '',
            filter: 'Всего в списке'
        };
    }

    addItem = (name, image) => {
        let date = new Date();
        let id = JSON.parse(localStorage.getItem('id')) + 1;
        localStorage.setItem('id', 0);
        localStorage.setItem('id', id);
        const newItem = {
            name,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            image,
            complet: false,
            favorite: false,
            id: JSON.parse(localStorage.getItem('id')),
        };

        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr.sort(function (a, b) {
                    return b.time.localeCompare(a.time);
                }),
            };
        });
        const { dataList } = this.state;

        dataList[0].sum += 1;
        localStorage.setItem('dataList', JSON.stringify(dataList));
    };

    deleteItem = (id, name) => {
        const res = window.confirm(`Вы действительно хотите удалить ${name}?`);
        const { dataList } = this.state;
        if (res) {
            this.setState(({ data }) => {
                return {
                    data: data.filter((item) => item.id !== id),
                };
            });
            dataList[0].sum -= 1;
            this.id -= 1;
            this.onDeleteComplet(id);
            this.onDeleteFav(id);
            localStorage.setItem('dataList', JSON.stringify(dataList));
        } else {
            return;
        }
    };

    onAddComplet = (id) => {
        const newDataList = this.state.dataList;
        const data = this.state.data;
        data.map((item) => {
            if (item.id === id) {
                if (item.complet === false) {
                    item.complet = true;
                }
            }
            return data;
        });
        newDataList[1].sum = data.filter((item) => item.complet).length;
        this.setState({ dataList: newDataList });
        localStorage.setItem('dataList', JSON.stringify(this.state.dataList));
        localStorage.setItem('data', JSON.stringify(data));
    };

    onDeleteComplet = (id) => {
        const newDataList = this.state.dataList;
        const data = this.state.data;
        data.map((item) => {
            if (item.id === id) {
                if (item.complet === true) {
                    item.complet = false;
                }
            }
            return data;
        });
        newDataList[1].sum = data.filter((item) => item.complet).length;
        this.setState({ dataList: newDataList });
        localStorage.setItem('dataList', JSON.stringify(this.state.dataList));
    };

    onAddFav = (id) => {
        const newDataList = this.state.dataList;
        const data = this.state.data;
        data.map((item) => {
            if (item.id === id) {
                if (item.favorite === false) {
                    item.favorite = true;
                }
            }
            return data;
        });
        newDataList[2].sum = data.filter((item) => item.favorite).length;
        this.setState({ dataList: newDataList });
        localStorage.setItem('dataList', JSON.stringify(this.state.dataList));
    };

    onDeleteFav = (id) => {
        const newDataList = this.state.dataList;
        const data = this.state.data;
        data.map((item) => {
            if (item.id === id) {
                if (item.favorite === true) {
                    item.favorite = false;
                }
            }
            return data;
        });
        newDataList[2].sum = data.filter((item) => item.favorite).length;
        this.setState({ dataList: newDataList });
        localStorage.setItem('dataList', JSON.stringify(this.state.dataList));
    };

    searchItem = (items, search) => {
        if (search.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.name.indexOf(search) > -1;
        });
    };

    onUpdateSearch = (search) => {
        this.setState({ search });
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'Просмотрено':
                return items.filter(item => item.complet);
            case 'В избранном':
                return items.filter(item => item.favorite);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const { data, dataList, search, filter } = this.state;
        const visibleData = this.filter(this.searchItem(data, search), filter);
        localStorage.setItem('data', JSON.stringify(data));
        return (
            <div className="App">
                <Header
                    data={data}
                    dataList={dataList}
                    addItem={this.addItem}
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}
                />
                <Search onUpdateSearch={this.onUpdateSearch}/>
                <MainList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    dataList={dataList}
                    onAddComplet={this.onAddComplet}
                    onDeleteComplet={this.onDeleteComplet}
                    onAddFav={this.onAddFav}
                    onDeleteFav={this.onDeleteFav}
                />
            </div>
        );
    }
}

export default App;
