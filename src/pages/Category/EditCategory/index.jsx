import React from 'react'
import Layout from "../../../components/Layout"
import Content from "../../../components/Content"
import CategoryForm from '../../../components/CategoryForm'

const EditCategory = ()=>{
    return(
        <Layout>
            <Content title={'Edit Category'}>
                <CategoryForm />
            </Content>
        </Layout>
    )
}


export default EditCategory
