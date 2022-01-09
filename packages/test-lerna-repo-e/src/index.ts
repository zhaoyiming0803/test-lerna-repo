import 'reflect-metadata'

function classDecorator(): ClassDecorator {
	return function (construtor) {
		Reflect.defineMetadata('classMetaData', 'A', construtor)
	}
}

function methodDecorator(): MethodDecorator {
	return function (target, key, descriptor) {
		Reflect.defineMetadata('methodMetaData', 'B', target, key)
	}
}

@classDecorator()
class SomeClass {
	@methodDecorator()
	someMethod() { }
}

console.log(Reflect.getMetadata('classMetaData', SomeClass)) // 'A'
console.log(Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod')) // 'B'
console.log(Reflect.getMetadata('methodMetaData', SomeClass.prototype, 'someMethod')) // 'B'