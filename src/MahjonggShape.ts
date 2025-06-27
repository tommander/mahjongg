export type MahjonggShapeDefinition = Array<{x: number, y: number, z: number}>

export type MahjonggShape = {
    width: number
    height: number
    depth: number
    shapeDefinition: MahjonggShapeDefinition
}

export type MahjonggShapeName = 'turtle'

export const mahjonggShapeTurtle: MahjonggShape = {
    width: 29,
    height: 15,
    depth: 5,
    shapeDefinition: [
		{x: 3, y: 1, z: 1}, {x: 5, y: 1, z: 1}, {x: 7, y: 1, z: 1}, {x: 9, y: 1, z: 1},
		{x: 11, y: 1, z: 1}, {x: 13, y: 1, z: 1}, {x: 15, y: 1, z: 1}, {x: 17, y: 1, z: 1},
		{x: 19, y: 1, z: 1}, {x: 21, y: 1, z: 1}, {x: 23, y: 1, z: 1}, {x: 25, y: 1, z: 1},
		{x: 7, y: 3, z: 1}, {x: 9, y: 3, z: 1}, {x: 11, y: 3, z: 1}, {x: 13, y: 3, z: 1},
		{x: 15, y: 3, z: 1}, {x: 17, y: 3, z: 1}, {x: 19, y: 3, z: 1}, {x: 21, y: 3, z: 1},
		{x: 5, y: 5, z: 1}, {x: 7, y: 5, z: 1}, {x: 9, y: 5, z: 1}, {x: 11, y: 5, z: 1},
		{x: 13, y: 5, z: 1}, {x: 15, y: 5, z: 1}, {x: 17, y: 5, z: 1}, {x: 19, y: 5, z: 1},
		{x: 21, y: 5, z: 1}, {x: 23, y: 5, z: 1}, {x: 1, y: 8, z: 1}, {x: 3, y: 7, z: 1},
		{x: 5, y: 7, z: 1}, {x: 7, y: 7, z: 1}, {x: 9, y: 7, z: 1}, {x: 11, y: 7, z: 1},
		{x: 13, y: 7, z: 1}, {x: 15, y: 7, z: 1}, {x: 17, y: 7, z: 1}, {x: 19, y: 7, z: 1},
		{x: 21, y: 7, z: 1}, {x: 23, y: 7, z: 1}, {x: 25, y: 7, z: 1}, {x: 3, y: 9, z: 1},
		{x: 5, y: 9, z: 1}, {x: 7, y: 9, z: 1}, {x: 9, y: 9, z: 1}, {x: 11, y: 9, z: 1},
		{x: 13, y: 9, z: 1}, {x: 15, y: 9, z: 1}, {x: 17, y: 9, z: 1}, {x: 19, y: 9, z: 1},
		{x: 21, y: 9, z: 1}, {x: 23, y: 9, z: 1}, {x: 25, y: 9, z: 1}, {x: 27, y: 8, z: 1},
		{x: 29, y: 8, z: 1}, {x: 5, y: 11, z: 1}, {x: 7, y: 11, z: 1}, {x: 9, y: 11, z: 1},
		{x: 11, y: 11, z: 1}, {x: 13, y: 11, z: 1}, {x: 15, y: 11, z: 1}, {x: 17, y: 11, z: 1},
		{x: 19, y: 11, z: 1}, {x: 21, y: 11, z: 1}, {x: 23, y: 11, z: 1}, {x: 7, y: 13, z: 1},
		{x: 9, y: 13, z: 1}, {x: 11, y: 13, z: 1}, {x: 13, y: 13, z: 1}, {x: 15, y: 13, z: 1},
		{x: 17, y: 13, z: 1}, {x: 19, y: 13, z: 1}, {x: 21, y: 13, z: 1}, {x: 3, y: 15, z: 1},
		{x: 5, y: 15, z: 1}, {x: 7, y: 15, z: 1}, {x: 9, y: 15, z: 1}, {x: 11, y: 15, z: 1},
		{x: 13, y: 15, z: 1}, {x: 15, y: 15, z: 1}, {x: 17, y: 15, z: 1}, {x: 19, y: 15, z: 1},
		{x: 21, y: 15, z: 1}, {x: 23, y: 15, z: 1}, {x: 25, y: 15, z: 1}, {x: 9, y: 3, z: 2},
		{x: 11, y: 3, z: 2}, {x: 13, y: 3, z: 2}, {x: 15, y: 3, z: 2}, {x: 17, y: 3, z: 2},
		{x: 19, y: 3, z: 2}, {x: 9, y: 5, z: 2}, {x: 11, y: 5, z: 2}, {x: 13, y: 5, z: 2},
		{x: 15, y: 5, z: 2}, {x: 17, y: 5, z: 2}, {x: 19, y: 5, z: 2}, {x: 9, y: 7, z: 2},
		{x: 11, y: 7, z: 2}, {x: 13, y: 7, z: 2}, {x: 15, y: 7, z: 2}, {x: 17, y: 7, z: 2},
		{x: 19, y: 7, z: 2}, {x: 9, y: 9, z: 2}, {x: 11, y: 9, z: 2}, {x: 13, y: 9, z: 2},
		{x: 15, y: 9, z: 2}, {x: 17, y: 9, z: 2}, {x: 19, y: 9, z: 2}, {x: 9, y: 11, z: 2},
		{x: 11, y: 11, z: 2}, {x: 13, y: 11, z: 2}, {x: 15, y: 11, z: 2}, {x: 17, y: 11, z: 2},
		{x: 19, y: 11, z: 2}, {x: 9, y: 13, z: 2}, {x: 11, y: 13, z: 2}, {x: 13, y: 13, z: 2},
		{x: 15, y: 13, z: 2}, {x: 17, y: 13, z: 2}, {x: 19, y: 13, z: 2}, {x: 11, y: 5, z: 3},
		{x: 13, y: 5, z: 3}, {x: 15, y: 5, z: 3}, {x: 17, y: 5, z: 3}, {x: 11, y: 7, z: 3},
		{x: 13, y: 7, z: 3}, {x: 15, y: 7, z: 3}, {x: 17, y: 7, z: 3}, {x: 11, y: 9, z: 3},
		{x: 13, y: 9, z: 3}, {x: 15, y: 9, z: 3}, {x: 17, y: 9, z: 3}, {x: 11, y: 11, z: 3},
		{x: 13, y: 11, z: 3}, {x: 15, y: 11, z: 3}, {x: 17, y: 11, z: 3}, {x: 13, y: 7, z: 4},
		{x: 15, y: 7, z: 4}, {x: 13, y: 9, z: 4}, {x: 15, y: 9, z: 4}, {x: 14, y: 8, z: 5}
	]
}

export type MahjonggShapeMap = {
    [k in MahjonggShapeName]: MahjonggShape
}

export const mahjonggShapeMap: MahjonggShapeMap = {
    'turtle': mahjonggShapeTurtle
}

