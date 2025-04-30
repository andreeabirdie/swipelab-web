declare const newrelic: {
    addPageAction: (name: string, attributes?: Record<string, any>) => void;
    noticeError: (error: Error, customAttributes?: Record<string, any>) => void;
} | undefined;

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
    private static logToConsole(level: LogLevel, message: string, data?: any) {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

        switch (level) {
            case 'info':
                console.info(formattedMessage, data || '');
                break;
            case 'warn':
                console.warn(formattedMessage, data || '');
                break;
            case 'error':
                console.error(formattedMessage, data || '');
                break;
            case 'debug':
                console.debug(formattedMessage, data || '');
                break;
        }
    }

    private static logToNewRelic(actionName: string, attributes: Record<string, any> = {}) {
        // console.log('Sending to New Relic:', actionName, attributes); // <--- DEBUG
        if (typeof newrelic !== 'undefined' && newrelic.addPageAction) {
            newrelic.addPageAction(actionName, attributes);
            console.log("sent")
        }
    }


    static info(message: string, data?: Record<string, any>) {
        // this.logToConsole('info', message, data);
        this.logToNewRelic('Info', { message, ...data });
    }

    static warn(message: string, data?: Record<string, any>) {
        // this.logToConsole('warn', message, data);
        this.logToNewRelic('Warn', { message, ...data });
    }

    static error(message: string, data?: Record<string, any>) {
        this.logToConsole('error', message, data);
        this.logToNewRelic('Error', { message, ...data });
    }

    static debug(message: string, data?: Record<string, any>) {
        // Only logging debug messages to console, not to New Relic
        this.logToConsole('debug', message, data);
    }

    static captureError(error: Error, customAttributes: Record<string, any> = {}) {
        console.error('Captured Exception:', error);
        if (typeof newrelic !== 'undefined' && newrelic.noticeError) {
            newrelic.noticeError(error, customAttributes);
        }
    }
}

export default Logger;
