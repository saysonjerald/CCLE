const setMode = (lang) => {
  switch (lang) {
    case 'C++':
      return 'text/x-c++src';
    case 'C#':
      return 'text/x-csharp';
    case 'Go':
      return 'text/x-go';
    case 'Java':
      return 'text/x-java';
    case 'Kotlin':
      return 'text/x-kotlin';
    case 'Lua':
      return 'text/x-lua';
    case 'JavaScript':
      return 'text/javascript';
    case 'Pascal':
      return 'text/x-pascal';
    case 'Perl':
      return 'text/x-perl';
    case 'Php':
      return 'text/x-php';
    case 'Python3':
      return 'text/x-python';
    case 'R':
      return 'text/x-rsrc';
    case 'Ruby':
      return 'text/x-ruby';
    case 'Rust':
      return 'text/x-rustsrc';
    case 'Shell':
      return 'text/x-sh';
    case 'SQL':
      return 'text/x-sql';
    case 'Swift':
      return 'text/x-swift';
    default:
      return '';
  }
};
export default setMode;
