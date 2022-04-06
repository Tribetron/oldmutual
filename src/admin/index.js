import React, { Component } from 'react';
import { render } from 'react-dom';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { PostList, PostEdit, PostCreate, PostIcon } from './posts';

class AdminUi extends Component {


render(){
    return(
        <div>
        <Admin dataProvider={simpleRestProvider('http://10.70.12.38:4000')}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
    </Admin>
    </div>
    )
};

}

export default AdminUi;