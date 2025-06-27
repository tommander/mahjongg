export type MahjonggTileCharacter = '🀇'|'🀈'|'🀉'|'🀊'|'🀋'|'🀌'|'🀍'|'🀎'|'🀏'
export type MahjonggTileStick = '🀐'|'🀑'|'🀒'|'🀓'|'🀔'|'🀕'|'🀖'|'🀗'|'🀘'
export type MahjonggTileCircle = '🀙'|'🀚'|'🀛'|'🀜'|'🀝'|'🀞'|'🀟'|'🀠'|'🀡'
export type MahjonggTileDragon = '🀆'|'🀅'|'🀄︎'
export type MahjonggTileWind = '🀀'|'🀃'|'🀁'|'🀂'
export type MahjonggTileFlower = '🀢'|'🀣'|'🀤'|'🀥'
export type MahjonggTileSeason = '🀩'|'🀦'|'🀨'|'🀧'
export type MahjonggTileSymbol = MahjonggTileCharacter|MahjonggTileStick|MahjonggTileCircle|MahjonggTileDragon|MahjonggTileWind|MahjonggTileFlower|MahjonggTileSeason

export const mahjonggTileCharacters = ['🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏'];
export const mahjonggTileCircles = ['🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡'];
export const mahjonggTileSticks = ['🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘'];
export const mahjonggTileDragons = ['🀆','🀅','🀄︎'];
export const mahjonggTileWinds = ['🀀','🀃','🀁','🀂'];
export const mahjonggTileFlowers = ['🀢', '🀣', '🀤', '🀥'];
export const mahjonggTileSeasons = ['🀩', '🀦', '🀨', '🀧'];


interface historyItem {
    classes: string,
    style: string,
    x: number,
    y: number,
    z: number,
    px: number,
    py: number,
    pz: number,
    t: string,
    text: string,
}
