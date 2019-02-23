export default ({name, sum, isChecked = false}) => `<input
    type="radio"
    id="filter__${ name }"
    class="filter__input visually-hidden"
    name="filter"
    ${ isChecked ? `checked` : `` }
    ${ !sum ? `disabled` : `` }
  />
  <label
    for="filter__${ name }"
    class="filter__label"
  >
    ${ name.toUpperCase() } <span class="filter__${ name }-count">${ sum }</span>
  </label>`;
