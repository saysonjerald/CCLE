import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckBoxsesTags = ({ spokenLanguage, setSpokenLanguage }) => {
  return (
    <Autocomplete
      multiple
      id="spokenLanguages"
      options={spokenLanguages}
      onChange={(event, value) => {
        setSpokenLanguage(value);
      }}
      disableCloseOnSelect
      value={spokenLanguage.map((value) => value)}
      // value={spokenLanguage.map((value) => value)}
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
          label="Spoken Languages"
          placeholder="Add Language"
        />
      )}
    />
  );
};

// const spokenLanguages = [
//   { language: 'Arabic' },
//   { language: 'Armenian' },
//   { language: 'Azerbaijani' },
//   { language: 'Basque' },
//   { language: 'Belarusian' },
//   { language: 'Bengali' },
//   { language: 'Bosnian' },
//   { language: 'Bulgarian' },
//   { language: 'Catalan' },
//   { language: 'Cebuano' },
//   { language: 'Chichewa' },
//   { language: 'Chinese' },
//   { language: 'Corsican' },
//   { language: 'Croatian' },
//   { language: 'Czech' },
//   { language: 'Danish' },
//   { language: 'Dutch' },
//   { language: 'English' },
//   { language: 'Esperanto' },
//   { language: 'Estonian' },
//   { language: 'Filipino' },
//   { language: 'Finnish' },
//   { language: 'French' },
//   { language: 'Frisian' },
//   { language: 'Galician' },
//   { language: 'Georgian' },
//   { language: 'German' },
//   { language: 'Greek' },
//   { language: 'Gujarati' },
//   { language: 'Haitian Creole' },
//   { language: 'Hausa' },
//   { language: 'Hawaiian' },
//   { language: 'Hebrew' },
//   { language: 'Hindi' },
//   { language: 'Hmong' },
//   { language: 'Hungarian' },
//   { language: 'Icelandic' },
//   { language: 'Igbo' },
//   { language: 'Indonesian' },
//   { language: 'Irish' },
//   { language: 'Italian' },
//   { language: 'Japanese' },
//   { language: 'Javanese' },
//   { language: 'Kannada' },
//   { language: 'Kazakh' },
//   { language: 'Khmer' },
//   { language: 'Kinyarwanda' },
//   { language: 'Korean' },
//   { language: 'Kurdish (Kurmanji)' },
//   { language: 'Kyrgyz' },
//   { language: 'Lao' },
//   { language: 'Latin' },
//   { language: 'Latvian' },
//   { language: 'Lithuanian' },
//   { language: 'Luxembourgish' },
//   { language: 'Macedonian' },
//   { language: 'Malagasy' },
//   { language: 'Malay' },
//   { language: 'Malayalam' },
//   { language: 'Maltese' },
//   { language: 'Maori' },
//   { language: 'Marathi' },
//   { language: 'Mongolian' },
//   { language: 'Myanmar (Burmese)' },
//   { language: 'Nepali' },
//   { language: 'Norwegian' },
//   { language: 'Odia (Oriya)' },
//   { language: 'Pashto' },
//   { language: 'Persian' },
//   { language: 'Polish' },
//   { language: 'Portuguese' },
//   { language: 'Punjabi' },
//   { language: 'Romanian' },
//   { language: 'Samoan' },
//   { language: 'Scots Gaelic' },
//   { language: 'Serbian' },
//   { language: 'Sesotho' },
//   { language: 'Shona' },
//   { language: 'Sindhi' },
//   { language: 'Sinhala' },
//   { language: 'Slovak' },
//   { language: 'Slovenian' },
//   { language: 'Somali' },
//   { language: 'Spanish' },
//   { language: 'Sundanese' },
//   { language: 'Swahili' },
//   { language: 'Swedish' },
//   { language: 'Tajik' },
//   { language: 'Tamil' },
//   { language: 'Tatar' },
//   { language: 'Telugu' },
//   { language: 'Thai' },
//   { language: 'Turkish' },
//   { language: 'Turkmen' },
//   { language: 'Ukrainian' },
//   { language: 'Urdu' },
//   { language: 'Uyghur' },
//   { language: 'Uzbek' },
//   { language: 'Vietnamese' },
//   { language: 'Welsh' },
//   { language: 'Xhosa' },
//   { language: 'Yiddish' },
//   { language: 'Yoruba' },
//   { language: 'Zulu' },
// ];

const spokenLanguages = [
  'Arabic',
  'Armenian',
  'Azerbaijani',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bosnian',
  'Bulgarian',
  'Catalan',
  'Cebuano',
  'Chichewa',
  'Chinese',
  'Corsican',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Esperanto',
  'Estonian',
  'Filipino',
  'Finnish',
  'French',
  'Frisian',
  'Galician',
  'Georgian',
  'German',
  'Greek',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hawaiian',
  'Hebrew',
  'Hindi',
  'Hmong',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Korean',
  'Kurdish (Kurmanji)',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Lithuanian',
  'Luxembourgish',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Maori',
  'Marathi',
  'Mongolian',
  'Myanmar (Burmese)',
  'Nepali',
  'Norwegian',
  'Odia (Oriya)',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Romanian',
  'Samoan',
  'Scots Gaelic',
  'Serbian',
  'Sesotho',
  'Shona',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Sundanese',
  'Swahili',
  'Swedish',
  'Tajik',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Turkish',
  'Turkmen',
  'Ukrainian',
  'Urdu',
  'Uyghur',
  'Uzbek',
  'Vietnamese',
  'Welsh',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zulu',
];

export default CheckBoxsesTags;
