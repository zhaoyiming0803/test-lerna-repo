import 'reflect-metadata'

interface Info {
    className: string
}

@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(message: string): string {
    this.print<Info>({
        className: 'Test'
    })
    return 'hello' + message;
  }

  @Reflect.metadata('inMethod', 'C')
  private print<T>(info: T): T {
    return info
  }
}

console.log(Reflect.getMetadata('inClass', Test)); // 'A'

console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
console.log(Reflect.getMetadata('inMethod', new Test(), 'print')); // 'C'