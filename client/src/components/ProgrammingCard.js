import React, { useState, useContext, useEffect } from 'react';
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  Checkbox,
  TextField,
  DialogActions,
  Divider,
  Input,
  Slider,
} from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { UserContext } from '../contexts/UserContext';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@mui/styles';
import { stringToColour } from '../utils/stringToColor';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProgrammingCard = ({
  id,
  match,
  language,
  choosenTopic,
  choosenDescription,
  ratePerMinute,
  programmingLanguageKnown,
  setProgrammingLanguageKnown,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, urlAPI } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const [programmingLanguage, setProgrammingLanguage] = useState(language);
  const [topic, setTopic] = useState(choosenTopic);
  const [description, setDescription] = useState(choosenDescription);

  const [initTopic, setInitTopic] = useState();
  const [initDescription, setInitDescription] = useState();
  const [initRatePerMinute, setInitRatePerMinute] = useState();
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
    card: {
      display: 'flex',
      position: 'relative',
      margin: '5px',
      maxWidth: '400px',
      minWidth: '300px',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });
  const classes = useStyles();
  // const color = stringToColour(language);
  // const img_url = `https://singlecolorimage.com/get/${color}/400x140`;

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
    setInitRatePerMinute(newValue);
  };

  const handleInputChange = (event) => {
    setInitRatePerMinute(
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (ratePerMinute < 0) {
      setInitRatePerMinute(0);
    } else if (ratePerMinute > maxRate) {
      setInitRatePerMinute(maxRate);
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
        .then((data) => {
          setProgrammingLanguageKnown(data.data.programmingLang);
        });
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  const updateProgrammingLanguage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .patch(`${urlAPI}api/v1/users/${user.id}/programmingLanguage/${id}`, {
          language: programmingLanguage,
          topic: initTopic,
          description: initDescription,
          ratePerMinute: initRatePerMinute,
        })
        .then(async (data) => {
          setProgrammingLanguageKnown(data.data.programmingLang);
          await getProgrammingLanguage().then(() => {
            enqueueSnackbar(`Updated successfully`, {
              variant: 'success',
            });
          });
        });

      if (res.data.status === 'success') {
        console.log('success updated successfully!');

        setProgrammingLanguage('');
        setTopic([]);
        setDescription('');

        return res;
      }
    } catch (err) {
      enqueueSnackbar(`${err.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  const deleteProgrammingLanguage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .delete(`${urlAPI}api/v1/users/${user.id}/programmingLanguage/${id}`)
        .then(async () => {
          await getProgrammingLanguage().then(() => {
            enqueueSnackbar(`Delete successfully`, {
              variant: 'success',
            });
          });
        });
    } catch (err) {
      enqueueSnackbar(`${err.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Card className={classes.card}>
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'brown',
            padding: '5px 10px',
          }}
        >
          ${ratePerMinute} per minute
        </span>
        {/* <CardMedia
          component="img"
          alt={`${language}`}
          height="140"
          image={`https://textoverimage.moesif.com/image?image_url=${img_url}&overlay_color=2c2c2c68&text=${language}&text_size=32&margin=0&y_align=middle&x_align=center`}
        /> */}
        <div
          style={{
            width: 'inherit',
            height: '140px',
            backgroundColor: `#${stringToColour(language)}`,
            // position: 'relative',
          }}
        >
          <span
            className="lang"
            style={{
              position: 'absolute',
              top: '25%',
              left: '50%',
              transform: `translate(${-50}%, ${-50}%)`,
            }}
          >
            <Typography component="h3" variant="h4">
              {language}
            </Typography>
          </span>
        </div>
        <CardContent>
          {topic.length ? (
            topic.map((name) => {
              return (
                <Chip
                  label={name}
                  size="small"
                  key={uuidv4()}
                  style={{ margin: '2px' }}
                />
              );
            })
          ) : (
            <>No topics available</>
          )}
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          {user.id === match ? (
            <>
              <Button size="small" onClick={deleteProgrammingLanguage}>
                Delete
              </Button>
              <Button size="small" onClick={handleClickOpen}>
                Update
              </Button>
            </>
          ) : (
            <>
              <p></p>
            </>
          )}
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose} style={{ textAlign: 'center' }}>
        <DialogTitle>What's your programming language?</DialogTitle>
        <DialogContent>
          <Autocomplete
            className={classes.margin}
            id="programmingLanguages"
            options={programmingLanguageList}
            onChange={(event, value) => {
              setProgrammingLanguage(value);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            value={programmingLanguage}
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
              setInitTopic(value);
            }}
            disableCloseOnSelect
            defaultValue={choosenTopic.map((value) => value)}
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
            defaultValue={choosenDescription}
            onChange={(e) => setInitDescription(e.target.value)}
          />
          <Divider>
            <Chip label="Pricing" />
          </Divider>
          <Typography id="non-linear-slider" style={{ marginTop: '12px' }}>
            Rate per minute
          </Typography>
          <span>$</span>
          <Input
            value={initRatePerMinute ? initRatePerMinute : ratePerMinute}
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
            value={
              typeof initRatePerMinute === 'number'
                ? initRatePerMinute
                : ratePerMinute
            }
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
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
              await updateProgrammingLanguage(e)
                .then(() => {
                  handleClose();
                })
                .catch((err) => handleClose());
            }}
          >
            Update Language
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

export default ProgrammingCard;
