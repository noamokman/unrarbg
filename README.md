# unrarbg [![Build Status](https://travis-ci.org/noamokman/unrarbg.svg?branch=master)](https://travis-ci.org/noamokman/unrarbg)
a tool to move media files from rarbg

![Logo](icon.png)

## Installation
As cli tool
```bash
$ npm install -g unrarbg
```

Programmatically
```bash
$ npm install unrarbg
```


## Usage
### CLI
```bash
$  unrarbg 0.0.0 - a tool to move media files from rarbg

   USAGE

     unrarbg <src> <dest>

   ARGUMENTS

     <src>     The path to the source folder         required   
     <dest>    The path to the destination folder    required   

   GLOBAL OPTIONS

     -h, --help        Display help                                      
     -V, --version     Display version                                   
     --no-color        Disable colors                                    
     --quiet           Quiet mode - only displays warn and error messages
     -v, --verbose     Verbose mode - will also output debug messages    
```

### Programmatically
```js
import unrarbg from 'unrarbg';

unrarbg('~/downloads', '~/series'); // returns a promise to a report on performed actions
```

## License

[MIT](LICENSE) © [Noam Okman](https://github.com/noamokman)