const mongoose = require('mongoose');

const programmingLanguageSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, 'Programming Language cannot be empty!'],
      enum: [
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
      ],
      unique: true,
    },
    topic: {
      type: [String],
      required: [true, 'Topic cannot be empty!'],
      enum: [
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
      ],
    },
    description: {
      type: String,
      require: [true, 'Description connot be empty!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ProgrammingLanguage = mongoose.model(
  'ProgrammingLanguage',
  programmingLanguageSchema
);

module.exports = ProgrammingLanguage;
