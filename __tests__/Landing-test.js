import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Landing from '../js/Landing'

jest.mock('../js/fbAuth')

describe("Should have a sign in button", ()=>{
  let landingComponent = {}

  beforeEach(()=>{
    // This is NOT a reference to the element in the page...
    //   it IS a reference to the component code
    landingComponent = TestUtils.renderIntoDocument(<Landing />)
  })

  it("should have a sign in button", ()=>{
    const signInButton = TestUtils.isElement("button"
    )
    expect(signInButton).toBeDefined()
   })
  })
