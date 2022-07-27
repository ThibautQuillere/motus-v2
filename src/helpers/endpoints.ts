const serverUrl = 'https://motus.ew-staging.com';

export const Endpoints = {
  word: `${serverUrl}/word`, // GET - initial data (word length, first letter)
  attempt: `${serverUrl}/attempt`, // POST - check if word is correct 
  checkWord: `${serverUrl}/check-word`, // POST - check if word exists
};