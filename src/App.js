import React, { Component } from "react";
import "./App.css";
import Languages from "./LanguageList";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import Paper from "material-ui/Paper";
import { Container, Row, Col } from "react-grid-system";

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

  fetchSearchResults(topics, languages, sort, keywords, event) {
    if (event) {
      event.preventDefault();
    }
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
          <Container>
            <h1>Govfinder</h1>
          </Container>
          <Container>
            <Row>
              {/* Search options box */}
              <Col md={4}>
                <Paper zDepth={3}>
                  <header>
                    <Paper zDepth={1} className="search--header">
                      <h2>Find projects</h2>
                    </Paper>
                  </header>
                  <form
                    onSubmit={e =>
                      this.fetchSearchResults(
                        this.state.filterTopics,
                        this.state.filterLanguages,
                        "sort",
                        this.state.keywords,
                        e
                      )}
                  >
                    <div className="search--body">
                      <div classnName="search--input-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="search--icon"
                          fill="#B2B2B2"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                        <TextField
                          hintText="Keywords..."
                          hintStyle={{ marginLeft: "30px" }}
                          underlineFocusStyle={{ borderColor: "#002865" }}
                          value={this.state.keywords}
                          onChange={this.handleKeywordsInputChange}
                          className="search--input"
                        />
                      </div>
                      {languageCheckboxes}
                    </div>

                    <RaisedButton
                      fullWidth={true}
                      backgroundColor="#485265"
                      labelColor="#FFF"
                      onClick={() =>
                        this.fetchSearchResults(
                          this.state.filterTopics,
                          this.state.filterLanguages,
                          "sort",
                          this.state.keywords
                        )}
                      label="Update results"
                    />
                  </form>
                </Paper>
              </Col>

              {/* Search results */}
              <Col md={8}>
                <ul>
                  {formatSearchResults}
                </ul>
              </Col>
            </Row>
          </Container>

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
