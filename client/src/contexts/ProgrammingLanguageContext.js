import React, { createContext, useState } from 'react';

export const ProrammingLanguageContext = createContext();

const ProgrammingLanguageProvider = (props) => {
  const [language, setLanguage] = useState('');
  const [topic, setTopic] = useState([]);
  const [description, setDescription] = useState('');
  const [programmingLanguageKnown, setProgrammingLanguageKnown] = useState([]);

  return (
    <ProrammingLanguageContext.Provider
      value={{
        language,
        setLanguage,
        topic,
        setTopic,
        description,
        setDescription,
        programmingLanguageKnown,
        setProgrammingLanguageKnown,
      }}
    >
      {props.children}
    </ProrammingLanguageContext.Provider>
  );
};

export default ProgrammingLanguageProvider;
