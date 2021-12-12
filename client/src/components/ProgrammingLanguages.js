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
  Divider,
  Chip,
  Slider,
  Input,
} from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { makeStyles } from '@mui/styles';

import { UserContext } from '../contexts/UserContext';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();
  const { user, urlAPI } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [ratePerMinute, setRatePerMinute] = React.useState(0.05);
  const maxRate = 30;

  const useStyles = makeStyles({
    form: {
      display: 'flex',
    },
    margin: {
      margin: '12px',
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

  function valuetext(value) {
    return `$${value}`;
  }

  const handleSliderChange = (event, newValue) => {
    setRatePerMinute(newValue);
  };

  const handleInputChange = (event) => {
    setRatePerMinute(
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (ratePerMinute < 0) {
      setRatePerMinute(0);
    } else if (ratePerMinute > maxRate) {
      setRatePerMinute(maxRate);
    }
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
          ratePerMinute,
        });

      if (res.data.status === 'success') {
        const lang = res.data.programmingLanguage.language;
        await getProgrammingLanguage().then(() => {
          enqueueSnackbar(`${lang} added from the list`, {
            variant: 'success',
          });
        });
        console.log('success updated successfully!');
        setLanguage('');
        setTopic([]);
        setDescription('');
        ratePerMinute(0.05);

        return res;
      }
    } catch (err) {
      enqueueSnackbar(`${err.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Language
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center' }}>
          What's your programming language?
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <Autocomplete
            className={classes.margin}
            id="chooseprogrammingLanguages"
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
            style={{ width: '95%' }}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Divider>
            <Chip label="Pricing" />
          </Divider>
          <Typography id="non-linear-slider" style={{ marginTop: '12px' }}>
            Rate per minute
          </Typography>
          <span>$</span>
          <Input
            value={ratePerMinute}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.01,
              min: 0.01,
              // max: maxRate,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {/* <Slider
            value={typeof ratePerMinute === 'number' ? ratePerMinute : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            defaultValue={0.05}
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            valueLabelDisplay="auto"
            step={0.01}
            min={0.01}
            max={30}
          /> */}
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
