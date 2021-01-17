
import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main css={[tw`flex-1`, !fullWidth && tw`container mx-auto`]}>
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout