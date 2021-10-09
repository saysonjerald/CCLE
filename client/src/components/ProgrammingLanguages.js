import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Autocomplete,
  Checkbox,
} from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { makeStyles } from '@mui/styles';

import { UserContext } from '../contexts/UserContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProgrammingLanguages = ({
  match,
  language,
  setLanguage,
  topic,
  setTopic,
  description,
  setDescription,
  setProgrammingLanguageKnown,
}) => {
  const { user, urlAPI } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const useStyles = makeStyles({
    form: {
      display: 'flex',
    },
    margin: {
      margin: '5px',
    },
    wrapper: {
      width: '1200px',
      margin: '50px auto',
    },
  });
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProgrammingLanguage = async () => {
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(`api/v1/users/${match}/programmingLanguage`)
        .then((programmingLang) => {
          setProgrammingLanguageKnown(programmingLang.data.programmingLang);
        });
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  const addProgrammingLanguage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .post(`${urlAPI}api/v1/users/${user.id}/programmingLanguage`, {
          language,
          topic,
          description,
        });

      if (res.data.status === 'success') {
        console.log('success updated successfully!');
        setLanguage('');
        setTopic([]);
        setDescription('');
        await getProgrammingLanguage();
        return res;
      }
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  return (
    <>
      <Typography component="h2" variant="h6">
        Programming Languages
      </Typography>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Language
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>What's your programming language?</DialogTitle>
        <DialogContent>
          <Autocomplete
            className={classes.margin}
            id="programmingLanguages"
            options={programmingLanguageList}
            onChange={(event, value) => {
              setLanguage(value);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            value={language}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8, backgroundColor: '#333' }}
                />
                {option}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Programming Langauge"
                placeholder="Add programming language"
              />
            )}
          />

          <Autocomplete
            className={classes.margin}
            multiple
            id="topics"
            options={topicList}
            onChange={(event, value) => {
              setTopic(value);
            }}
            disableCloseOnSelect
            value={topic.map((value) => value)}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8, backgroundColor: '#333' }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Topics that I know"
                placeholder="Add Topics"
              />
            )}
          />

          <TextField
            className={classes.margin}
            label="Tell us your experience on this language"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async (e) => {
              await addProgrammingLanguage(e)
                .then(() => {
                  handleClose();
                })
                .catch((err) => handleClose());
            }}
          >
            Add Language
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const programmingLanguageList = [
  'APL',
  'ASN.1',
  'Asterisk dialplan',
  'Brainfuck',
  'C',
  'C++',
  'C#',
  'Ceylon',
  'Clojure',
  'Closure Stylesheets (GSS)',
  'CMake',
  'COBOL',
  'CoffeeScript',
  'Common Lisp',
  'Crystal',
  'CSS',
  'Cypher',
  'Cython',
  'D',
  'Dart',
  'Django (templating language)',
  'Dockerfile',
  'diff',
  'DTD',
  'Dylan',
  'EBNF',
  'ECL',
  'Eiffel',
  'Elixir',
  'Elm',
  'Erlang',
  'Factor',
  'FCL',
  'Forth',
  'Fortran',
  'F#',
  'Gas (AT&T-style assembly)',
  'Gherkin',
  'Go',
  'Groovy',
  'HAML',
  'Handlebars',
  'Haskell (Literate)',
  'Haxe',
  'HTML',
  'HTTP',
  'IDL',
  'Java',
  'JavaScript (JSX)',
  'Jinja2',
  'Julia',
  'Kotlin',
  'LESS',
  'LiveScript',
  'Lua',
  'Markdown (GitHub-flavour)',
  'Mathematica',
  'mbox',
  'mIRC',
  'Modelica',
  'MscGen',
  'MUMPS',
  'Nginx',
  'NSIS',
  'N-Triples/N-Quads',
  'Objective C',
  'OCaml',
  'Octave (MATLAB)',
  'Oz',
  'Pascal',
  'PEG.js',
  'Perl',
  'PGP (ASCII armor)',
  'PHP',
  'Pig Latin',
  'PowerShell',
  'Properties files',
  'ProtoBuf',
  'Pug',
  'Puppet',
  'Python',
  'Q',
  'R',
  'RPM',
  'reStructuredText',
  'Ruby',
  'Rust',
  'SAS',
  'Sass',
  'Spreadsheet',
  'Scala',
  'Scheme',
  'SCSS',
  'Shell',
  'Sieve',
  'Slim',
  'Smalltalk',
  'Smarty',
  'Solr',
  'Soy',
  'Stylus',
  'SQL (several dialects)',
  'SPARQL',
  'Squirrel',
  'Swift',
  'sTeX, LaTeX',
  'Tcl',
  'Textile',
  'Tiddlywiki',
  'Tiki wiki',
  'TOML',
  'Tornado (templating language)',
  'troff (for manpages)',
  'TTCN',
  'TTCN Configuration',
  'Turtle',
  'Twig',
  'VB.NET',
  'VBScript',
  'Velocity',
  'Verilog/SystemVerilog',
  'VHDL',
  'Vue.js app',
  'Web IDL',
  'WebAssembly Text Format',
  'XML/HTML',
  'XQuery',
  'Yacas',
  'YAML',
  'YAML frontmatter',
  'Z80',
];

const topicList = [
  'Syntax',
  'Data Types',
  'Variables',
  'Keywords',
  'Basic Operations',
  'Loops',
  'Numbers',
  'Characters',
  'Arrays',
  'Strings',
  'Functions',
  'Others',
];

export default ProgrammingLanguages;
