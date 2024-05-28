import React from 'react'
import Layout from "../../../components/Layout"
import Content from "../../../components/Content"
import BorrowForm from '../../../components/BorrowForm'

const AddBorrow = ()=>{
    return(
        <Layout>
            <Content title="Borrow Book">
                <BorrowForm />
            </Content>
        </Layout>
    )
}

export default AddBorrow