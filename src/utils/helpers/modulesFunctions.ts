import {
  ModuleCompositionItem,
  ModuleCompositionItemNested,
  ModuleCompositionItemType
} from '@services/modules/interfaces';

/**
 * Update a media item in a nested module composition
 * @param data
 * @param newItem
 */
export function updateMediaItem(
  data: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  newItem: ModuleCompositionItemNested
): (ModuleCompositionItem | ModuleCompositionItemNested)[] {
  const clonedData = JSON.parse(JSON.stringify(data));

  // Recursive function to search and replace the item
  function searchAndReplace(
    items: (ModuleCompositionItem | ModuleCompositionItemNested)[]
  ): boolean {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the current item matches the criteria
      if (item.id === newItem.id && item.type === ModuleCompositionItemType.MEDIA) {
        items[i] = newItem; // Replace the item with the new one
        return true; // Return true to indicate the item has been replaced
      }

      // If the item has a 'composition', recursively search and replace within it
      if ('composition' in item && item.composition && Array.isArray(item.composition)) {
        const replaced = searchAndReplace(item.composition);
        if (replaced) {
          return true; // Stop the search once the item is replaced
        }
      }
    }
    return false; // Return false if no item was replaced
  }

  // Start the search and replace operation
  searchAndReplace(clonedData);
  return clonedData;
}

/**
 * Find a media item by its id in a nested module composition
 * @param data
 * @param id
 */

export function findMediaId(
  data: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  id: number
) {
  // Recursive function to search through each item and its composition
  function search(
    items: (ModuleCompositionItem | ModuleCompositionItemNested)[]
  ): ModuleCompositionItemNested | undefined {
    for (const item of items) {
      // Check if the current item matches the criteria
      if (item.type === ModuleCompositionItemType.MEDIA && item.id === id) {
        return item; // Return the item immediately when a match is found
      }

      // If the item has a 'composition', recursively search within it
      if ('composition' in item && item.composition && Array.isArray(item.composition)) {
        const foundId: ModuleCompositionItemNested | undefined = search(item.composition);
        if (foundId !== undefined) {
          return foundId; // Return the id from deeper in the recursion if a match is found
        }
      }
    }

    // Return undefined if no matching item is found in the current branch
    return undefined;
  }

  // Start the search
  return search(data);
}

/**
 * Add a nested item to a nested module composition
 * @param composition
 * @param subjectId
 * @param newItem
 */
export function addNestedItem(
  composition: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  subjectId: number | null,
  newItem: ModuleCompositionItemNested
) {
  const newComposition = JSON.parse(JSON.stringify(composition));
  if (subjectId !== null) {
    const subjectIndex = newComposition.findIndex(
      (item: ModuleCompositionItem | ModuleCompositionItemNested) =>
        Number(item.id) === Number(subjectId) && item.type === ModuleCompositionItemType.SUBJECT
    );
    if (subjectIndex) {
      const newSubject: ModuleCompositionItem = newComposition[
        subjectIndex
      ] as ModuleCompositionItem;
      newSubject.composition.push(newItem);
    }
  } else {
    newComposition.push(newItem);
  }

  return newComposition;
}

/**
 * Delete a media item in a nested module composition
 * @param data
 * @param idToDelete The ID of the item to delete
 */
export function deleteMediaItem(
  data: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  idToDelete: number
): (ModuleCompositionItem | ModuleCompositionItemNested)[] {
  const clonedData = JSON.parse(JSON.stringify(data));

  // Recursive function to search and delete the item
  function searchAndDelete(
    items: (ModuleCompositionItem | ModuleCompositionItemNested)[]
  ): boolean {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the current item matches the criteria
      if (item.id === idToDelete && item.type === ModuleCompositionItemType.MEDIA) {
        items.splice(i, 1); // Remove the item from the array
        return true; // Return true to indicate the item has been deleted
      }

      // If the item has a 'composition', recursively search and delete within it
      if ('composition' in item && item.composition && Array.isArray(item.composition)) {
        const deleted = searchAndDelete(item.composition);
        if (deleted) {
          return true; // Stop the search once the item is deleted
        }
      }
    }
    return false; // Return false if no item was deleted
  }

  // Start the search and delete operation
  searchAndDelete(clonedData);
  return clonedData;
}

/**
 * Update a qyestion item in a nested module composition
 * @param data
 * @param newItem
 */
export function updateQuestionItem(
  data: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  newItem: ModuleCompositionItemNested
): (ModuleCompositionItem | ModuleCompositionItemNested)[] {
  const clonedData = JSON.parse(JSON.stringify(data));

  // Recursive function to search and replace the item
  function searchAndReplace(
    items: (ModuleCompositionItem | ModuleCompositionItemNested)[]
  ): boolean {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the current item matches the criteria
      if (item.id === newItem.id && item.type === ModuleCompositionItemType.QUESTION) {
        items[i] = newItem; // Replace the item with the new one
        return true; // Return true to indicate the item has been replaced
      }

      // If the item has a 'composition', recursively search and replace within it
      if ('composition' in item && item.composition && Array.isArray(item.composition)) {
        const replaced = searchAndReplace(item.composition);
        if (replaced) {
          return true; // Stop the search once the item is replaced
        }
      }
    }
    return false; // Return false if no item was replaced
  }

  // Start the search and replace operation
  searchAndReplace(clonedData);
  return clonedData;
}

/**
 * Find a qyestion item by its id in a nested module composition
 * @param data
 * @param id
 */

export function findQuestionId(
  data: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  id: number
) {
  // Recursive function to search through each item and its composition
  function search(
    items: (ModuleCompositionItem | ModuleCompositionItemNested)[]
  ): ModuleCompositionItemNested | undefined {
    for (const item of items) {
      // Check if the current item matches the criteria
      if (item.type === ModuleCompositionItemType.QUESTION && item.id === id) {
        return item; // Return the item immediately when a match is found
      }

      // If the item has a 'composition', recursively search within it
      if ('composition' in item && item.composition && Array.isArray(item.composition)) {
        const foundId: ModuleCompositionItemNested | undefined = search(item.composition);
        if (foundId !== undefined) {
          return foundId; // Return the id from deeper in the recursion if a match is found
        }
      }
    }

    // Return undefined if no matching item is found in the current branch
    return undefined;
  }

  // Start the search
  return search(data);
}

/**
 * Delete a question item in a nested module composition
 * @param data
 * @param idToDelete The ID of the item to delete
 */
export function deleteQuestionItem(
  data: (ModuleCompositionItem | ModuleCompositionItemNested)[],
  idToDelete: number
): (ModuleCompositionItem | ModuleCompositionItemNested)[] {
  const clonedData = JSON.parse(JSON.stringify(data));

  // Recursive function to search and delete the item
  function searchAndDelete(
    items: (ModuleCompositionItem | ModuleCompositionItemNested)[]
  ): boolean {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the current item matches the criteria
      if (item.id === idToDelete && item.type === ModuleCompositionItemType.QUESTION) {
        items.splice(i, 1); // Remove the item from the array
        return true; // Return true to indicate the item has been deleted
      }

      // If the item has a 'composition', recursively search and delete within it
      if ('composition' in item && item.composition && Array.isArray(item.composition)) {
        const deleted = searchAndDelete(item.composition);
        if (deleted) {
          return true; // Stop the search once the item is deleted
        }
      }
    }
    return false; // Return false if no item was deleted
  }

  // Start the search and delete operation
  searchAndDelete(clonedData);
  return clonedData;
}
