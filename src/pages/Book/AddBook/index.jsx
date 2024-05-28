import React from 'react'
import Layout from "../../../components/Layout"
import BookForm from "../../../components/BookForm"
import Content from '../../../components/Content'

const AddBook = ()=>{
    return(
        <Layout>
            <Content title={'Add Book'}>
                <BookForm />
            </Content>
        </Layout>
    )
}

export default AddBook