import React, { Component } from "react";
import "./App.css";
import Languages from "./LanguageList";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterTopics: ["government"],
      keywords: "",
      filterLanguages: [],
      sort: "",
      searchResults: [],
      open: false
    };
    this.handleKeywordsInputChange = this.handleKeywordsInputChange.bind(this);
    this.handleLanguagesInputChange = this.handleLanguagesInputChange.bind(
      this
    );
  }

  componentDidMount() {
    this.fetchSearchResults(
      this.state.filterTopics,
      this.state.filterLanguages,
      "sort",
      this.state.keywords
    );
  }

  handleKeywordsInputChange(e: any) {
    this.setState({ keywords: e.target.value });
  }

  handleLanguagesInputChange(e: any, isInputChecked) {
    let languages = this.state.filterLanguages;

    if (isInputChecked) {
      languages.push(e.target.value);
    } else {
      languages = languages.filter(function(language) {
        return language !== e.target.value;
      });
    }

    this.setState({ filterLanguages: languages });
  }

  fetchSearchResults(topics, languages, sort, keywords) {
    this.setState({ open: true });

    const topicsParam = topics
      .map((topic, index) => `topic:${topic}`)
      .join("+");

    let languagesParam = "";
    if (languages.length > 0) {
      languagesParam = languages
        .map((language, index) => `language:${language}`)
        .join("+");
    }

    const endpoint = `https://api.github.com/search/repositories?q=${keywords}+${topicsParam}+${languagesParam}`;

    fetch(endpoint)
      .then(response => {
        response.json().then(data => {
          this.setState({ open: false });
          this.setState({ searchResults: data.items });
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    const searchResults = this.state.searchResults;
    const formatSearchResults = searchResults.map((result, index) =>
      <li key={index}>
        <h3>
          <a href={result.html_url}>
            {result.name}
          </a>
        </h3>
        <p>
          {result.description}
        </p>
        <img src={result.owner.avatar_url} alt="github avatar" />
      </li>
    );

    const languageCheckboxes = Languages.map((language, index) =>
      <Checkbox
        key={index}
        label={language.label}
        value={language.value}
        onCheck={this.handleLanguagesInputChange}
      />
    );

    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Govfinder</h1>

          <TextField
            floatingLabelText="Keyword"
            value={this.state.keywords}
            onChange={this.handleKeywordsInputChange}
          />
          {languageCheckboxes}

          <RaisedButton
            fullWidth={true}
            onClick={() =>
              this.fetchSearchResults(
                this.state.filterTopics,
                this.state.filterLanguages,
                "sort",
                this.state.keywords
              )}
            label="Update results"
          />

          <ul>
            {formatSearchResults}
          </ul>

          <Snackbar
            open={this.state.open}
            message="Updating your project list"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
