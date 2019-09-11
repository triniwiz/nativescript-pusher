import * as types from 'tns-core-modules/utils/types';
export function serialize(value) {
  let store;
  switch (typeof value) {
    case 'string':
    case 'boolean':
    case 'number': {
      return value;
    }

    case 'object': {
      if (!value) {
        return null;
      }

      if (value instanceof Date) {
        return value.toJSON();
      }
      if (Array.isArray(value)) {
        store = new org.json.JSONArray();
        value.forEach(item => store.put(item));
        return store;
      }
      store = new org.json.JSONObject();
      Object.keys(value).forEach(key => store.put(key, serialize(value[key])));
      return store;
    }

    default:
      return null;
  }
}

export function deserialize(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  let store;
  switch (types.getClass(value)) {
    case 'java.lang.String': {
      return String(value);
    }

    case 'java.lang.Boolean': {
      return Boolean(value);
    }

    case 'java.lang.Integer':
    case 'java.lang.Long':
    case 'java.lang.Double':
    case 'java.lang.Short': {
      return Number(value);
    }

    case 'org.json.JSONArray': {
      store = new Array();
      for (let j = 0; j < value.length(); j++) {
        store[j] = deserialize(value.get(j));
      }
      break;
    }

    case 'org.json.JSONObject': {
      store = new Object();
      let i = value.keys();
      while (i.hasNext()) {
        let key = i.next();
        store[key] = deserialize(value.get(key));
      }
      break;
    }

    default:
      store = null;
  }
  return store;
}
