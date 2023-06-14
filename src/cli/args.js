const parseArgs = () => {
    const arguments = process.argv.slice(2); 
    const result = [];

  for (let index = 0; index < arguments.length; index += 2) {
    const argumentName = arguments[index].replace('--', '');
    const argumentValue = arguments[index + 1];
    result.push(`${argumentName} is ${argumentValue}`);
  }

  console.log(result.join(', '))
};

parseArgs();