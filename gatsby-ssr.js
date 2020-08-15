import React from "react"
import Layout from "./src/layout"

export const wrapRootElement = ({ element, props }) => {
    return (
        <Layout {...props}>
            {element}
        </Layout>
    )
}