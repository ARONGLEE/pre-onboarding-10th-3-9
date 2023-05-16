/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line react/prop-types
const Dropdown = ({ searchData, inputText, onSelect }) => {
  return (
    <div className="dropdown-container">
      {searchData.map((data, idx) => {
        const regex = new RegExp(`(${inputText})`, 'gi');
        const highlightedText = data.replace(regex, '<span class="highlighted">$1</span>');
        console.log(data);
        return (
          <div className="dropdown-text" key={idx} onClick={() => onSelect(data)}>
            <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
