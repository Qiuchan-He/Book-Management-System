import React from 'react'
import Layout from "../../../components/Layout"
import Content from "../../../components/Content"
import BookForm from "../../../components/BookForm"

const EditBook = ()=>{
    return(
        <Layout>
            <Content title={'Edit Book'}>
                <BookForm />
            </Content>
        </Layout>
    )
}


export default EditBook
