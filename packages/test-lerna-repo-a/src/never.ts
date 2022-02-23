interface Circle {
  kind: 'circle'
  radius: number
}
 
interface Square {
  kind: 'square'
  sideLength: number
}
 
type Shape = Circle | Square
 
export function getArea (shape: Shape) {
	// Type 'Shape' is not assignable to type 'never'.
	// Type 'Circle' is not assignable to type 'never'.
	// const value: never = shape

	// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
	switch (shape.kind) {
		case 'circle':
			return Math.PI * shape.radius ** 2
		case 'square':
			return shape.sideLength ** 2
		default:
			const _exhaustiveCheck: never = shape
			return _exhaustiveCheck
	}
}
