import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import LanguageFiltersItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryItemsList: [],
    filteredId: 'ALL',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.selectOptionApi()
  }

  onChangeOption = option => {
    this.setState({filteredId: option}, this.selectOptionApi)
  }

  selectOptionApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {filteredId} = this.state
    const url = ` https://apis.ccbp.in/popular-repos?language=${filteredId}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const filteredData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))

      this.setState({
        repositoryItemsList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  rendercardItems = () => {
    const {repositoryItemsList} = this.state
    return (
      <ul className="card-items-container">
        {repositoryItemsList.map(eachItems => (
          <RepositoryItem key={eachItems.id} eachItems={eachItems} />
        ))}
      </ul>
    )
  }

  apiFailureView = () => (
    <div className="products-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="register-prime-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  loadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0284c7" height="50" width="50" />
    </div>
  )

  statusCheck = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.apiFailureView()
      case apiStatusConstants.success:
        return this.rendercardItems()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <h1 className="page-heading">Popular</h1>
        <ul className="filter-items-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFiltersItem
              key={eachItem.id}
              eachItem={eachItem}
              onChangeOption={this.onChangeOption}
            />
          ))}
        </ul>
        {this.statusCheck()}
      </div>
    )
  }
}

export default GithubPopularRepos
