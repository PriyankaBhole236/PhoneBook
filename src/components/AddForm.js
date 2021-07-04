import {Component} from 'react';
import List from "./List";


class AddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dir: [],
            item:{
                name:"",
                tel:""
            },
            isEditing:false,
            temp_id:null
        }

        this.add = this.add.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
    }


    add(e){
        e.preventDefault();
        let dir = this.state.dir;
        dir.push(this.state.item)
        this.setState({dir :dir, item:{ name:"", tel:""}});
    }

    view(item){
        alert(
            `
            Name = ${item.name}\n
            Tel = ${item.tel}
            `
        )
    }

    edit(id){
        let item = this.state.dir[id]
        this.setState({isEditing:true, item:item, temp_id:id})
    }

    update(e){
        e.preventDefault();
        let dir = this.state.dir;
        dir[this.state.temp_id] = this.state.item;
        this.setState({
            dir :dir,
            item:{ name:"", tel:""},
            isEditing:false,
            temp_id:null
        });
    }

    delete(id){
        let dir = this.state.dir
        dir.splice(id, 1)
        this.setState({dir:dir})
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        let item = this.state.item;
        item[name] = value;
        this.setState({item:item});
    }

    render() {
        return (
            <div className="col-md-6">
                <form onSubmit={this.state.isEditing ?this.update : this.add} method="POST">
                    <div className="mb-2">
                        <input type="text"
                               name="name"
                               className="form-control"
                               placeholder="Enter Name"
                               value={this.state.item.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="mb-2">
                        <input type="text"
                               name="tel"
                               className="form-control"
                               placeholder="Enter Phone"
                               value={this.state.item.tel}
                               onChange={this.handleChange}/>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-success"
                           value={this.state.isEditing ? "Update" : "Save"}/>
                </form>
                <List
                    dir={this.state.dir}
                    delete={this.delete}
                    edit={this.edit}
                    view={this.view}
                />
            </div>
        )
    }

}

export default AddForm;