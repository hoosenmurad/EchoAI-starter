import { Logger } from "tslog";

const LOG_LEVEL = process.env.LOG_LEVEL;
const LOG_FORMAT = process.env.LOG_FORMAT;

enum LogLevel {
  Debug = 0,
  Trace = 1, 
  Info = 2,
  Warn = 3,
  Error = 4,
}

export class SynchronicityLogger {
  private readonly logger: Logger<any>;
  private readonly format: "pretty" | "json";
  private name = "SynchronicityLogger";
  private lastTimestamp: number | null = null;
  private readonly level: LogLevel;

  constructor({ name }: { name?: string }) {
    this.level = this.getLogLevel(LOG_LEVEL ? LOG_LEVEL : "info");
    this.format = LOG_FORMAT ? (LOG_FORMAT as "pretty" | "json") : "json";
    this.name = name ? name : this.name;

    this.logger = new Logger({
      name: this.name,
      type: this.format,
      overwrite: {
        transportJSON: (obj) =>
          SynchronicityLogger.transportJSON(obj, this.format),
      },
      argumentsArrayName: "args",
    });
  }

  public setName(name: string) {
    this.name = name;
  }

  private getLogLevel(level: string): LogLevel {
    switch (level.toLowerCase()) {
      case "debug":
      case "trace":
        return LogLevel.Debug;
      case "info":
        return LogLevel.Info;
      case "warn":
        return LogLevel.Warn;
      case "error":
        return LogLevel.Error;
      default:
        throw new Error(`Unknown log level: ${level}`);
    }
  }

  static transportJSON(logObj: any, type: "pretty" | "json") {
    const args: any[] = logObj.args;
    const metadata =
      typeof args[args.length - 1] === "object" && !Array.isArray(args[args.length - 1])
        ? args.pop()
        : {};
    const newLogObj = {
      message: args.join(" "),
      hostname: logObj._meta.hostname,
      name: logObj._meta.name,
      timestamp: logObj._meta.date,
      level: logObj._meta.logLevelName,
      pid: process.pid,
      metadata,
      environment: process.env.ENV_IDENTIFIER || "unset",
    };

    if (type === "json") {
      console.log(JSON.stringify(newLogObj));
    } else {
      console.log(newLogObj);
    }

    return newLogObj;
  }
}
