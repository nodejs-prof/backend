const SEVERITY = {
  INFO: "INFO",
  TRACE: "TRACE",
  ERROR: "ERROR",
  WARN: "WARN",
  PERF: "PERF",
  DEBUG: "DEBUG",
};

const LOG_LEVEL_PRIORITY = {
  ERROR: 1,
  PERF: 2,
  WARN: 3,
  INFO: 4,
  DEBUG: 5,
  TRACE: 6,
};

const Logger = (functionName, user, methodName = "", passedInUser = "") => {
  const log = (severity, message, ...args) => {
    let passedInSeverity = severity;
    if (!passedInSeverity) {
      passedInSeverity = SEVERITY.INFO;
    }

    const logLevel =
      process.env.LOG_LEVEL && process.env.LOG_LEVEL.toUpperCase();

    if (
      logLevel &&
      LOG_LEVEL_PRIORITY[logLevel] < LOG_LEVEL_PRIORITY[passedInSeverity]
    ) {
      return;
    }

    let methodExecuted = functionName;
    if (methodName) {
      methodExecuted += `.${methodName}`;
    }
    const consoleString = `[${passedInSeverity}] ${methodExecuted} @ ${passedInUser} | ${message}`;
    _logMessage(consoleString, args);
  };

  const _logMessage = (consoleString, ...args) => {
    if (args && args.length > 0) {
      console.log(consoleString, ...args);
    } else {
      console.log(consoleString);
    }
  };

  return { log };
};

export { SEVERITY, Logger };
