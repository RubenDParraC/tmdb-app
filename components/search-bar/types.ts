// The type definition for the props passed into the SearchBar component
export type SearchBarTypes = {
  // The current query string used in the search bar
  searchQuery: string;

  // Event handler for when the user types in the search bar input
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Event handler for when the user clicks the search button
  handleSearchClick: () => void;
};
