import React from 'react'
import '../styles/SearchPage.module.css'

import { withRouter } from 'react-router-dom'
import SearchModule from '../components/search/SearchModule'

class SearchPage extends React.Component {
  landingImages = this.props.landingImages
  searchIcon = this.props.searchIcon
  cameraImage = this.props.cameraImage
  showFileUpload = '24px'

  componentDidMount() {}

  handleQuerySubmit = (searchType, value) => {
    if (searchType === 'counterfeit' && typeof value === 'object') {
      this.props.history.push(
        `/results?type=${searchType}&address=${value.contractAddress}` +
          `&token=${value.tokenId}&chain=${value.chain}&filter=${value.filterAddress}`
      )
    } else {
      this.props.history.push(`/results?type=${searchType}&query=${value}`)
    }
  }

  handleFileUpload = (searchType, file) => {
    this.props.fileSearch(file)
    this.props.history.push(`/results?type=${searchType}`)
  }

  render() {
    return (
      <>
        <div className="container-center-horizontal">
          <div className="main-page screen">
            <div className="flex-row">
              <div className="flex-col-6-header">
                <div className="main-subtitle">
                  Search Ethereum & Polygon NFTs using NFTPort
                </div>
                <SearchModule
                  cameraImage={this.cameraImage}
                  onSubmit={this.handleQuerySubmit}
                  handleFileUpload={this.handleFileUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(SearchPage)
