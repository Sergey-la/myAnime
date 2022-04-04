import React, { Component } from 'react';
import NavItem from './NavItem';

import def from '../../assets/images/default-img.jpg';
import './Header.scss';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time: '',
            image: def,
            added: false,
            addMes: '',
        };
        this.messageImg = React.createRef();
        this.btn = React.createRef();
        this.input = React.createRef();
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    uploadImage = (e) => {
        if (e.target.files[0].size > 1 * 1024 * 1024) {
            this.messageImg.current.innerHTML = 'Размер изображения более 1mb!';
            this.messageImg.current.classList.add('_error');
            this.btn.current.disabled = true;
            if (this.messageImg.current.classList.contains('_success')) {
                this.messageImg.current.classList.remove('_success');
            }
            return;
        }

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                this.setState({ image: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
            this.messageImg.current.innerHTML =
                'Макс-ый размер изображения - 1mb';
            this.messageImg.current.classList.add('_success');
            this.btn.current.disabled = false;
            if (this.messageImg.current.classList.contains('_error')) {
                this.messageImg.current.classList.remove('_error');
            }
        }
    };

    onSibmit = (e) => {
        e.preventDefault();
        this.setState({
            name: '',
            image: def,
            addMes: this.state.name,
        });
        this.props.addItem(this.state.name, this.state.image);
        this.input.current.value = '';
        this.onAdded();
        this.onAddMes();
        setTimeout(() => {
            this.onAddMes();
        }, 2000);
        
    };

    onAddMes = () => {
        this.setState(({ addMesShow }) => ({
            addMesShow: !addMesShow,
        }));
    };

    onAdded = () => {
        this.setState(({ added }) => ({
            added: !added,
        }));
    };

    render() {
        const { dataList, filter, onFilterSelect} = this.props;
        const elements = dataList.map((item) => {
            const { id, ...itemProps } = item;
            
            return <NavItem key={id} filter={filter} onFilterSelect={onFilterSelect} {...itemProps} />;
        });

        const { added, addMesShow, addMes, name, image } = this.state;

        return (
            <div className="Header">
                <h1>Список аниме</h1>
                <nav className="Header-menu">
                    <ul>{elements}</ul>
                </nav>
                <button
                    className={added ? 'Btn _hide' : 'Btn'}
                    onClick={this.onAdded}
                >
                    Добавить новое аниме
                </button>
                <div
                    className={
                        addMesShow ? 'Header__add-mes _show' : 'Header__add-mes'
                    }
                >
                    <div className="Header__add-mes-wrapper">
                        <span>{addMes} </span>
                        добавлено в список
                    </div>
                </div>
                <form
                    className={added ? 'AddItemPopup _show' : 'AddItemPopup'}
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={this.onSibmit}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Название"
                        required="required"
                        autoComplete="off"
                        value={name}
                        onChange={this.onValueChange}
                    />
                    <div className="AddItemPopup__img">
                        <img src={image} alt="" />
                        <span
                            className="AddItemPopup__img-mes"
                            ref={this.messageImg}
                        >
                            Макс-ый размер изображения - 1mb
                        </span>
                    </div>
                    <input
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        name="image"
                        ref={this.input}
                        onChange={this.uploadImage}
                    />
                    <button
                        type="submit"
                        className="Btn Form-btn"
                        ref={this.btn}
                        onClick={this.addImage}
                    >
                        Добавить
                    </button>
                    <button
                        type="button"
                        className="Btn Form-btn"
                        onClick={this.onAdded}
                    >
                        Отмена
                    </button>
                </form>
            </div>
        );
    }
}

export default Header;
