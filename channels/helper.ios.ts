import * as types from 'tns-core-modules/utils/types';
export function serialize(data) {
  switch (typeof data) {
    case 'number':
    case 'string':
    case 'boolean':
      return data;
    case 'object':
      if (Array.isArray(data)) {
        return NSArray.arrayWithArray(<any>data.map(serialize));
      }

      let obj = {};
      for (let key of Object.keys(data)) {
        obj[key] = serialize(data[key]);
      }
      return NSDictionary.dictionaryWithDictionary(<any>obj);
    default:
      return NSNull.new();
  }
}
export function deserialize(nativeData) {
  if (types.isNullOrUndefined(nativeData)) {
    // some native values will already be js null values
    // calling types.getClass below on null/undefined will cause crash
    return null;
  } else {
    switch (types.getClass(nativeData)) {
      case 'NSNull':
        return null;
      case 'NSMutableDictionary':
      case 'NSDictionary':
        let obj = {};
        const length = nativeData.count;
        const keysArray = nativeData.allKeys as NSArray<any>;
        for (let i = 0; i < length; i++) {
          const nativeKey = keysArray.objectAtIndex(i);
          obj[nativeKey] = deserialize(nativeData.objectForKey(nativeKey));
        }
        return obj;
      case 'NSMutableArray':
      case 'NSArray':
        let array = [];
        const len = nativeData.count;
        for (let i = 0; i < len; i++) {
          array[i] = deserialize(nativeData.objectAtIndex(i));
        }
        return array;
      default:
        return nativeData;
    }
  }
}
