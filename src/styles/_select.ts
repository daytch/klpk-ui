import { GroupBase, StylesConfig } from 'react-select'

export const selectDefaultStyles: StylesConfig<
  any,
  boolean,
  GroupBase<unknown>
> = {
  control: (base, state) => ({
    ...base,
    borderRadius: 5,
    padding: '4px 20px',
    backgroundColor: '#141519',
    borderColor: '#AF7F3E',
    boxShadow: state.isFocused ? 'none' : 'none',
    '&:hover': {
      borderColor: '#AF7F3E',
    },
  }),
  valueContainer: (base) => ({ ...base }),
  placeholder: (base) => ({
    ...base,
    fontSize: '14px',
    color: '#726a64',
  }),
  indicatorsContainer: (base) => ({ ...base, display: 'none' }),
  singleValue: (base) => ({ ...base, color: '#D6B16D', fontSize: 14 }),
  menu: (base) => ({ ...base, backgroundColor: '#726A64' }),
  option: (base) => ({
    ...base,
    backgroundColor: 'transparent',
    color: '#D6B16D',
    '&:hover': {
      backgroundColor: '#1B1C21',
      color: '#AF7F3E',
    },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 999 }),
  input: (base) => ({ ...base, color: '#D6B16D', fontWeight: '100' }),
}
