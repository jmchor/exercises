import logo from './components/logo.svg';
import './App.css';
import Header from './components/Header';

// App.js
// ... imports stay unchanged

const heading = <h1> React is cool! </h1>;

const student = {
  firstName: 'johannes',
  lastName: 'chorzempa'
};
const { firstName, lastName } = student;

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function justCapitalized(str) {
  return str[0].toUpperCase();}

function App() {
  return (
    <div className="App">
      {heading}

      <h3>
        Hi, {firstName} {lastName}!
      </h3>

      <h4>In uppercase: {firstName.toUpperCase()} {lastName.toUpperCase()}</h4>
      <h4>
        Capitalized:
        { capitalizeFirstLetter(firstName) } { capitalizeFirstLetter(lastName) }
      </h4>
      <h4>
        Only capitalized initials:
        { justCapitalized(firstName) } { justCapitalized(lastName) }
      </h4>

      <img src="{logo}" alt="logo" />
    </div>
  );
}



export default App;
