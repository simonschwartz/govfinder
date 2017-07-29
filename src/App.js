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
import Moment from "moment";

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
    const formatSearchResults = searchResults.map((result, index) => {
      const UpdatedAt = Moment(result.updated_at).fromNow();
      return (
        <li key={index} className="search-result--item">
          <img
            src={result.owner.avatar_url}
            alt="github avatar"
            className="search-result--item__avatar"
          />
          <div className="search-result--item__body">
            <h3>
              <a href={result.html_url}>
                {result.name}
              </a>
            </h3>
            <p>
              {result.description}
            </p>
            <ul className="search-result--stats">
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#B2B2B2">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="search-result--stats__text">
                  Stars {result.stargazers_count}
                </span>
              </li>
              <li>
                <svg
                  aria-hidden="true"
                  height="18"
                  viewBox="0 0 14 16"
                  width="18"
                  fill="#B2B2B2"
                >
                  <path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
                </svg>
                <span className="search-result--stats__text">
                  Issues {result.open_issues_count}
                </span>
              </li>
              <li>
                <svg
                  aria-label="fork"
                  height="16"
                  version="1.1"
                  viewBox="0 0 10 16"
                  width="10"
                  fill="#B2B2B2"
                >
                  <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" />{" "}
                </svg>
                <span className="search-result--stats__text">
                  {result.language}
                </span>
              </li>
              <li>
                <span className="search-result--stats__text">
                  Updated {UpdatedAt}
                </span>
              </li>
            </ul>
          </div>
        </li>
      );
    });

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
                      <div className="search--input-wrapper">
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

                      <RaisedButton
                        className="search--submit"
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
                    </div>
                  </form>
                </Paper>
              </Col>

              {/* Search results */}
              <Col md={8}>
                <ul className="search-results__container">
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
