import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

import '@royalnavy/css-framework/index.scss'

import withNavigation from '../components/enhancers/withNavigation'
import Footer from '../components/presenters/footer'
import Layout from '../components/presenters/layout'
import PostArticle from '../components/presenters/post-article'
import Sidebar from '../components/presenters/sidebar'
import MastHead from '../components/presenters/Masthead'

import './default.scss'

const SidebarWithNavigation = withNavigation(Sidebar)

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`

export default function Template({ data }) {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | NELSON Standards`} />
      <MastHead />
      <main className="main">
        <PostArticle postData={post} />
        <SidebarWithNavigation
          className="aside aside--primary"
          title="Example sidebar"
        />
      </main>
      <Footer />
    </Layout>
  )
}

Template.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
}
