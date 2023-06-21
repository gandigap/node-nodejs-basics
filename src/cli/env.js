const parseEnv = () => {
    const prefix = "RSS_";
    const allEnvVariables = process.env;
    const arrEnvVarialblesWhichStartWithPrefix = [];
    for (const envVariable in allEnvVariables) {
      if (envVariable.startsWith(prefix)) {
        arrEnvVarialblesWhichStartWithPrefix.push(`${envVariable}=${allEnvVariables[envVariable]}`);
      }
    }

    console.log(arrEnvVarialblesWhichStartWithPrefix.join('; '));
};

parseEnv();