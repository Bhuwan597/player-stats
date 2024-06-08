export const darkModeStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1a1a1a',
      color: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1a1a1a',
      color: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#1a1a1a',
      color: '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  };
  
export const lightModeStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      color: '#000',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      color: '#000',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#ddd' : '#fff',
      color: '#000',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000',
    }),
  };