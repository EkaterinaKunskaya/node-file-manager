export const removeQuotes = (rowArgs) => {
    const nonEmptyArgs = rowArgs.filter(Boolean);
    const args = [];
    let currentArg = '';

    for (let arg of nonEmptyArgs) {
        if (/^['"]/.test(arg)) {
            currentArg += arg;
        } else if (/['"]$/.test(arg)) {
            currentArg += ' ' + arg;
            currentArg = currentArg.replace(/^['"]|['"]$/g, '');
            args.push(currentArg);
            currentArg = '';
        } else {
            (currentArg)
                ? currentArg += ' ' + arg
                : args.push(arg);
        }
    }

    return args;
};