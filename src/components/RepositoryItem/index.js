// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItems} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachItems
  return (
    <li className="item-container">
      <img className="card-img" src={avatarUrl} alt={name} />
      <h1 className="card-name">{name}</h1>
      <div className="info-container">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="info-text">{starsCount}</p>
      </div>
      <div className="info-container">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="stars"
        />
        <p className="info-text">{forksCount}</p>
      </div>
      <div className="info-container">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="stars"
        />
        <p className="info-text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
