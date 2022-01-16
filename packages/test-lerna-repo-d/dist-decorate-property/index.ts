import "reflect-metadata"

const formatMetadataKey = Symbol("format")

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString)
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}
class Greeter {
    @format("Hello, %s")
    greeting: string

    constructor(message: string) {
        this.greeting = message
    }

    greet() {
        let formatString = getFormat(this, "greeting")
        console.log('formatString: ', formatString)
        return formatString.replace("%s", this.greeting)
    }
}

console.log(new Greeter('this is message').greet())