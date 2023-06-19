/**
 * Flattens an object based on the given keys, producing an array of objects.
 *
 * @param {string[]} triggerKeys - keys used to flat the given object
 * @param {Object} object - object to flatten
 * @returns {Object[]} flattened version of the object
 */
const nestedToFlat = (triggerKeys = [], object = {}) => {
  // If the object is empty, return an empty array
  if (Object.keys(object).length === 0) {
    return [];
  }

  // if the objet not an array or a object, return it
  if (!Array.isArray(object) && typeof object !== 'object') {
    return [ object ];
  }


    // Base object excluding the trigger keys
    const baseObject = {};
    for (let key in object) {
      if (!triggerKeys.includes(key)) {
        baseObject[key] = object[key];
      }
    }
  
    // Process the nested elements using the trigger keys
    const nestedElements = triggerKeys.flatMap((key) => {
      const value = object[key];
  
      if (value === undefined) {
        return [];
      }
  
      if (Array.isArray(value)) {
        // If it's an array, recursively flatten each element
        return value.flatMap((item) => nestedToFlat(triggerKeys, item));
      } else {
        // Otherwise, recursively flatten the object
        return nestedToFlat(triggerKeys, value);
      }
    });
  
    // Merge the base object with the nested elements and remove empty objects in a imperative way
    const result = [];
    
    if (Object.keys(baseObject).length > 0) {
      result.push(baseObject);
    }

    for (let element of nestedElements) {
      if (Object.keys(element).length > 0) {
        result.push(element);
      }
    }

    return result;
  };
  
  module.exports = nestedToFlat;
  