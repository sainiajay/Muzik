import React from "react"
import Layout from "./src/layout"
import "./src/global.css"

export const wrapRootElement = ({ element, props }) => {
    return (
        <Layout {...props}>
            {element}
        </Layout>
    )
}