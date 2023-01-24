import {Component} from 'react'
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

class GithubPopularRepos extends Component {
  state = {
    repositoryItemsList: [],
    filteredId: 'ALL',
  }

  onChangeOption = option => {
    this.setState({filteredId: option})
  }

  selectOptionApi = async () => {
    const {filteredId} = this.state
    const url = ` https://apis.ccbp.in/popular-repos?language=${filteredId}`
    const response = await fetch(url)
    const data = await response.json()
    const filteredData = data.popular_repos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    return filteredData
  }

  render() {
    const filteredDataList = this.selectOptionApi()
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
        <ul className="card-items-container">
          {filteredDataList.map(eachItems => (
            <RepositoryItem key={eachItems.id} eachItems={eachItems} />
          ))}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
