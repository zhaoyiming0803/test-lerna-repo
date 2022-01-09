import 'reflect-metadata'

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

function Controller (path: string): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

function createMappingDecorator (method: string) {
	return function (path: string): MethodDecorator {
		return function (target, key, descriptor: any) {
			Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
			Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
		} 
	}
}

const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

function isConstructor(argument: any) {
	// NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
	return typeof argument === 'function' && argument
}

function isFunction (argument: any) {
	return typeof argument === 'function' && typeof argument.nodeType !== 'number'
}


function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance)
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(item => item !== 'constructor' && isFunction(prototype[item]))
  
	return methodsNames.map(methodName => {
    const fn = prototype[methodName]

    const route = Reflect.getMetadata(PATH_METADATA, SomeClass) + Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)

    return {
      route,
      method,
      fn,
      methodName
    }
  })
}

@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world'
  }

  @Post('/b')
  somePostMethod() {}
}

console.log('SomeClass path: ', Reflect.getMetadata(PATH_METADATA, SomeClass)) // '/test'

/**
[
  {
    route: '/test/a',
    method: 'GET',
    fn: [Function (anonymous)],
    methodName: 'someGetMethod'
  },
  {
    route: '/test/b',
    method: 'POST',
    fn: [Function (anonymous)],
    methodName: 'somePostMethod'
  }
]
 */
console.log('mapRoute: ', mapRoute(new SomeClass()))
