import 'reflect-metadata'

type Constructor<T = any> = new (...args: any[]) => T

function Injectable (): ClassDecorator {
	return function (target) {
		console.log('Injectable: ', target)
	}
}

class OtherService1 {
  a = 1
}

class OtherService2 {
  a = 2
}

@Injectable()
class TestService {
  constructor(
		private readonly otherService1: OtherService1,
		private readonly otherService2: OtherService2
	) {}

	testMethod () {
		console.log('this.otherService1.a: ', this.otherService1.a)
		console.log('this.otherService2.a: ', this.otherService2.a)
	}
}

function Factory <T>(target: Constructor<T>): T {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

console.log('Factory(TestService): ', Factory(TestService))

Factory(TestService).testMethod()
