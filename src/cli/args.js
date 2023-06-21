const parseArgs = () => {
    const args = process.argv.slice(2); 
    const result = [];

  for (let index = 0; index < args.length; index += 2) {
    const argumentName = args[index].replace('--', '');
    const argumentValue = args[index + 1];
    result.push(`${argumentName} is ${argumentValue}`);
  }

  console.log(result.join(', '))
};

parseArgs();