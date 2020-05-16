export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((item: any) => {
        if(item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item
    })
}