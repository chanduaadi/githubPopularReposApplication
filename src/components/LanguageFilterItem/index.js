// Write your code here

import './index.css'

const LanguageFiltersItem = props => {
  const {eachItem, onChangeOption} = props
  const {id, language} = eachItem

  const onClickBtn = () => {
    onChangeOption(id)
  }
  return (
    <li className="list-container">
      <button className="item-button" type="button" onClick={onClickBtn}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFiltersItem
