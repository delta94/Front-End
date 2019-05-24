export const initialState = {
  loggingIn: false,
  loggedIn: localStorage.getItem('token') ? true : false,
  loggingOut: false,
  fetchingUser: false,
  isAuthenticated: false,
  user: {},
  fetchingMeds: false,
  addingMed: false,
  editingMed: false,
  discontinuingMed: false,
  deletingMed: false,
  searchingMed: false,
  meds: [],
  activeMeds: [],
  inactiveMeds: [],
  med: {},
  medImage: null,
  searchResults: [],
  fetchingDiary: false,
  addingDiary: false,
  editingDiary: false,
  deletingDiary: false,
  diary: [],
  fetchingRems: false,
  addingRems: false,
  rems: [],
  filteredRems: [],
  error: null
};
